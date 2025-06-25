import React, { useEffect, useState, useRef } from "react";
import AdminNavbar from "./AdminNavbar";
import { adminService } from "../utils/services/adminService";
import { useAuth } from "../utils/useAuth";

function AdminDashboard1() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const previousOrderIds = useRef(new Set());
  const [orders, setOrders] = useState([]);
  const [openRows, setOpenRows] = useState([]);
  const [menuNames, setMenuNames] = useState({});

  const StatusOptions = {
    PENDING: "Pending",
    PLACED: "Placed",
    PREPARING: "Preparing",
    READY_FOR_PICKUP: "Ready for Pickup",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
  };

  const fetchMenuData = async (id) => {
    try {
      const response = await fetch(
        `https://pizzapoint-c71ca9db8a73.herokuapp.com/api/menuItem/get/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const json = await response.json();
      return json.name + " " + json.size;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log("Error fetching data:", error.message);
        console.log(token);
      }
    }
  };

  // useEffect when the app mounts
  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
    const token = localStorage.getItem("adminToken");
    const email = localStorage.getItem("adminEmail");
    if (!token) {
      console.error("No admin token found in local storage");
      // Redirect to login page or show an error message
      // window.location.href = '/adminLogin';
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const response = await adminService.validateToken(email);
        console.log(response);
        if (response.isExpired || response.role != "ADMIN") {
          console.error("Invalid admin token or insufficient permissions");
          // Redirect to login page or show an error message
          // window.location.href = '/adminLogin';
        }
      } catch (error) {
        console.error("Error validating admin token:", error);
        // Redirect to login page or show an error message
        // window.location.href = '/adminLogin';
      }
    };

    const restaurantStatus = async () => {
      try {
        const response = await adminService.getRestaurantStatus();
        if (response.isOpen) {
          console.log("Restaurant is open");
          setIsOpen(true);
        } else {
          console.log("Restaurant is closed");
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error fetching restaurant status:", error);
      }
    };

    checkAdminStatus();
    restaurantStatus();
  }, []);

  // Poll for new orders every 10 seconds
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const newOrders = await adminService.getAllOrders();
        setOrders(newOrders);

        const newOrderIds = new Set(newOrders.map((order) => order.orderId));

        let hasNew = false;
        newOrderIds.forEach((id) => {
          if (!previousOrderIds.current.has(id)) {
            hasNew = true;
          }
        });

        if (hasNew && audioRef.current) {
          audioRef.current.play();
        }

        previousOrderIds.current = newOrderIds;

        const names = {};
        for (const order of orders) {
          for (const item of order.orderItems) {
            if (!names[item.menuItemId]) {
              names[item.menuItemId] = await adminService.getMenuItemById(item.menuItemId);
            }
          }
        }
        setMenuNames(names);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); // 🔥 Run immediately once

    const interval = setInterval(fetchOrders, 10000); // 🔁 Then every 10s

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const updateRestaurantStatus = async () => {
    try {
      const response = await adminService.updateRestaurantStatus(!isOpen);
      setIsOpen((prev) => !prev);
      if (response.isOpen) {
        console.log("Restaurant opened successfully");
      } else {
        console.log("Restaurant closed successfully");
      }
    } catch (error) {
      console.error("Error updating restaurant status:", error);
    }
  };

  const toggleRow = (id) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(id)
        ? prevOpenRows.filter((rowId) => rowId !== id)
        : [...prevOpenRows, id]
    );
  };

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <div className="w-full">
      <AdminNavbar propIsOpen={isOpen} />
      <div className="mt-16">
        <h2>Order Watcher</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>Order #{order.orderId}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => {
          audioRef.current = new Audio("/notification.mp3");
          audioRef.current.play();
        }}
      >
        Enable Notifications
      </button>
      {/* You can test interaction manually too */}
      {/* <button onClick={playSound}>Test Sound</button> */}
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            <th className="pb-3 font-medium">ID</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Order Type</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Status Order</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <React.Fragment key={item.orderId}>
              <tr
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => toggleRow(item.orderId)}
              >
                <td className="py-4">{item.orderSequence}</td>
                <td className="py-4">
                  {new Date(item.createdAt).toLocaleString("en-US", options)}
                </td>
                <td className="py-4 max-w-[130px] truncate">
                  {item.user.name}
                </td>
                <td className="py-4">{item.orderType}</td>
                <td className="py-4">{item.totalPrice} HUF</td>
                <td className="py-4">
                  {item.status != "PLACED" && (
                    <select
                      className="border border-gray-300 rounded p-1 bg-white text-sm"
                      value={item.status}
                      onChange={(e) =>
                        updateOrderStatus(item.orderId, e.target.value)
                      }
                    >
                      {Object.keys(StatusOptions).map((key) => (
                        <option key={key} value={key}>
                          {StatusOptions[key]}
                        </option>
                      ))}
                    </select>
                  )}
                  {item.status == "PLACED" && (
                    <div className="flex items-center gap-3">
                      <button className="text-green-500 hover:text-green-700">
                        <i class="fa-solid fa-check"></i>
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>

              {openRows.includes(item.orderId) && (
                <tr className="bg-gray-50 border-t">
                  <td colSpan={7} className="py-4 px-6 text-sm text-gray-600">
                    <div className="space-y-2">
                      <p>
                        <strong>Order ID:</strong> #{item.orderId}
                      </p>
                      <p>
                        <strong>Phone:</strong> {item.user.phone}
                      </p>
                      {item.address && (
                        <p>
                          <strong>Location:</strong> {item.address.buildingName}
                          , Street - {item.address.street}, Floor -{" "}
                          {item.address.floor}, Intercom -{" "}
                          {item.address.intercom}
                        </p>
                      )}
                      <p>
                        <strong>OrderType:</strong> {item.orderType}
                      </p>
                      <p>
                        <strong>Payment Method:</strong> {item.paymentMethod}
                      </p>
                      <p>
                        <strong>Order:</strong>
                        {item.orderItems.map((orderItem, index) => (
                          <p key={index} className="text-sm">
                            <span className="font-medium">
                              {menuNames[orderItem.menuItemId] || "Loading..."}{" "}
                              (x{orderItem.quantity})
                            </span>
                            {orderItem.extras?.length > 0 && (
                              <span className="text-gray-500">
                                {" "}
                                — Extras:{" "}
                                {orderItem.extras.map((e) => e.name).join(", ")}
                              </span>
                            )}
                          </p>
                        ))}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard1;
