import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import { myOrdersService, productService } from '../utils/services';

const MyOrders = () => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await myOrdersService.getMyOrders(email);
        setOrders(data);
        
        // Get all unique menu item IDs
        const menuItemIds = new Set();
        data.forEach(order => {
          order.orderItems.forEach(item => {
            menuItemIds.add(item.menuItemId);
          });
        });
        
        // Fetch all product details at once
        const productPromises = Array.from(menuItemIds).map(async (id) => {
          try {
            const product = await productService.getProductById(id);
            return { id, product };
          } catch (err) {
            console.error(`Failed to fetch product ${id}:`, err);
            return { id, product: null };
          }
        });
        
        const products = await Promise.all(productPromises);
        const productDetailsMap = {};
        products.forEach(({ id, product }) => {
          if (product) {
            productDetailsMap[id] = product;
          }
        });
        
        setProductDetails(productDetailsMap);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">My Orders</h1>
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-28 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet. 🍕</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md transition hover:shadow-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
              onClick={() => handleOrderClick(order.orderId)}
            >
              <div className="px-6 py-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">{order.orderSequence}</p>
                    <p className="text-sm text-zinc-500 mb-3">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        order.status === 'DELIVERED'
                          ? 'text-green-600'
                          : order.status === 'PENDING'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {order.status}
                    </p>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-100">{order.totalPrice} HUF</p>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-100">Payment: {order.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
                  <p className="font-medium mb-2 text-zinc-700 dark:text-zinc-300">Items:</p>
                  <ul className="list-disc ml-5 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {order.orderItems.map((item) => (
                      <li key={item.id || `${item.menuItemId}-${item.quantity}`}>
                        {productDetails[item.menuItemId] ? 
                          `${productDetails[item.menuItemId].size} ${productDetails[item.menuItemId].name} × ${item.quantity} — ${item.pricePerItem} HUF` : 
                          `Loading... × ${item.quantity} — ${item.pricePerItem} HUF`
                        }
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 italic">
                  Click for details
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;