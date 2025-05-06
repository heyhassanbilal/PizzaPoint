import React, { useState, useEffect } from 'react';

const MyOrders = () => {
  
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
    //   const fetchOrders = async () => {
    //     try {
    //       const res = await fetch('/api/orders'); // Replace with your actual endpoint
    //       const data = await res.json();
    //       setOrders(data);
    //     } catch (err) {
    //       console.error('Failed to fetch orders:', err);
    //     }
    //   };
  
    //   fetchOrders();
    // }, []);
  
    const toggleExpand = (id) => {
      setExpandedOrderId(id === expandedOrderId ? null : id);
    };
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">My Orders</h1>
  
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders yet. 🍕</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md transition hover:shadow-lg border border-zinc-200 dark:border-zinc-700"
              >
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                >
                  <div>
                    <p className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">Order #{order.id}</p>
                    <p className="text-sm text-zinc-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        order.status === 'Delivered'
                          ? 'text-green-600'
                          : order.status === 'Pending'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {order.status}
                    </p>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-100">${order.total.toFixed(2)}</p>
                  </div>
                </button>
  
                {expandedOrderId === order.id && (
                  <div className="px-6 pb-4 text-sm text-zinc-700 dark:text-zinc-300 animate-fade-in">
                    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
                      <p className="font-medium mb-1">Items:</p>
                      <ul className="list-disc ml-5 space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity} — ${item.price}
                          </li>
                        ))}
                      </ul>
  
                      <p className="mt-4">
                        <span className="font-medium">Delivery Address:</span> {order.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
}
  
  export default MyOrders;