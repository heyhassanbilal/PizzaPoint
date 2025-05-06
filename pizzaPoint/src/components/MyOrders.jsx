import React, { useState, useEffect } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([{
    "id": "123",
    "date": "2025-05-05",
    "status": "Delivered",
    "total": 25.99,
    "address": "123 Pizza Street, Debrecen",
    "items": [
      { "name": "Margherita", "quantity": 1, "price": 10.99 },
      { "name": "Pepsi", "quantity": 2, "price": 2.50 }
    ]
  }]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // useEffect(() => {
  //   // Fetch user's orders from backend API
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await fetch('/api/orders'); // Change this to your actual endpoint
  //       const data = await res.json();
  //       setOrders(data);
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleExpand(order.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <p className="text-green-600 font-semibold">{order.status}</p>
              </div>

              {expandedOrderId === order.id && (
                <div className="mt-4 text-sm text-gray-700">
                  <p><span className="font-semibold">Total:</span> ${order.total}</p>
                  <p><span className="font-semibold">Items:</span></p>
                  <ul className="ml-4 list-disc">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x {item.quantity} — ${item.price}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2"><span className="font-semibold">Delivery Address:</span> {order.address}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
