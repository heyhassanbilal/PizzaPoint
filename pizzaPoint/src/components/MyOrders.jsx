import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/useAuth';
import { myOrdersService, productService } from '../utils/services'; // Adjust the import path as necessary

const MyOrders = () => {
  const { email } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await myOrdersService.getMyOrders(email);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, [email]); // Added email as dependency

  const toggleExpand = (id) => {
    setExpandedOrderId(id === expandedOrderId ? null : id);
  };

  // Fetch product details when an order is expanded
  useEffect(() => {
    if (expandedOrderId) {
      const expandedOrder = orders.find(order => order.orderId === expandedOrderId);
      if (expandedOrder) {
        expandedOrder.orderItems.forEach(async (item) => {
          try {
            // Only fetch if we don't already have the product details
            if (!productDetails[item.menuItemId]) {
              const product = await productService.getProductById(item.menuItemId);
              setProductDetails(prev => ({
                ...prev,
                [item.menuItemId]: product
              }));
            }
          } catch (err) {
            console.error(`Failed to fetch product ${item.menuItemId}:`, err);
          }
        });
      }
    }
  }, [expandedOrderId, orders, productDetails]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet. 🍕</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md transition hover:shadow-lg border border-zinc-200 dark:border-zinc-700"
            >
              <button
                onClick={() => toggleExpand(order.orderId)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <div>
                  <p className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">{order.orderSequence}</p>
                  <p className="text-sm text-zinc-500">{order.date}</p>
                  <ul className="list-disc ml-5 space-y-1">
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
              </button>

              {/* {expandedOrderId === order.orderId && (
                <div className="px-6 pb-4 text-sm text-zinc-700 dark:text-zinc-300 animate-fade-in">
                  <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
                    <p className="font-medium mb-1">Items:</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {order.orderItems.map((item) => (
                        <li key={item.id || `${item.menuItemId}-${item.quantity}`}>
                          {productDetails[item.menuItemId] ? 
                            `${productDetails[item.menuItemId].size} ${productDetails[item.menuItemId].name} × ${item.quantity} — ${item.pricePerItem} HUF` : 
                            `Loading... × ${item.quantity} — ${item.pricePerItem} HUF`
                          }
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4">
                      <span className="font-medium">Delivery Address:</span> {`${order.address.buildingName} ${order.address.street} floor: ${order.address.floor} intercom: ${order.address.intercom} apartment: ${order.address.apartmentNo}`}
                    </p>
                  </div>
                </div>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;