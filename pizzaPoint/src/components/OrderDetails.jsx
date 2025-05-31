import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { myOrdersService, productService } from "../utils/services";
import PizzaPointLoader from "./PizzaPointLoader";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { email } = useAuth();
  const [order, setOrder] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const orders = await myOrdersService.getMyOrders(email);
        const matchedOrder = orders.find((o) => o.orderId === orderId);

        if (!matchedOrder) {
          setOrder(null);
          setLoading(false);
          return;
        }

        setOrder(matchedOrder);

        // Fetch product details for all items
        const productPromises = matchedOrder.orderItems.map(async (item) => {
          try {
            const product = await productService.getProductById(item.menuItemId);
            return { id: item.menuItemId, product };
          } catch (err) {
            console.error(`Failed to fetch product ${item.menuItemId}:`, err);
            return { id: item.menuItemId, product: null };
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
        console.error("Failed to fetch order details:", err);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, email]);

  const handleBackClick = () => {
    navigate("/orders");
  };

  if (loading) {
    return (
      <PizzaPointLoader isLoading={loading}/>
    );
  }

  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.pricePerItem),
    0
  );


  return (
    <div className="flex items-center justify-center min-h-[93.5vh] bg-[#dc2626]">
      <div className="bg-white mt-24 p-8 rounded-2xl shadow-lg w-full max-w-2xl text-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{order.orderSequence}</h2>
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${
            order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' :
            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
            'bg-red-100 text-red-600'
          }`}>
            {order.status}
          </span>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">Order Date</p>
          <p className="font-medium">{order.date}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Items</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {order.orderItems.map((item) => (
              <div key={item.id || `${item.menuItemId}-${item.quantity}`} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-medium">
                    {productDetails[item.menuItemId] ? 
                      `${productDetails[item.menuItemId].size} ${productDetails[item.menuItemId].name}` : 
                      "Loading..."
                    }
                  </p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">{item.pricePerItem} HUF</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Delivery Address</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="mb-1">{order.address.buildingName}</p>
            <p className="mb-1">{order.address.street}</p>
            <p className="mb-1">Floor: {order.address.floor}</p>
            <p className="mb-1">Apartment: {order.address.apartmentNo}</p>
            <p>Intercom: {order.address.intercom}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Payment Details</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <p>Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Item Subtotal</p>
              <p className="font-medium">{order.totalCartAmount} HUF</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Delivery Fee</p>
              <p className="font-medium">{order.deliveryFee} HUF</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Service fee</p>
              <p className="font-medium">{order.serviceFee} HUF</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Bottle Deposit</p>
              <p className="font-medium">{order.bottleDepositFee} HUF</p>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <p className="font-bold">Total</p>
              <p className="font-bold">{order.totalPrice} HUF</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleBackClick}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}