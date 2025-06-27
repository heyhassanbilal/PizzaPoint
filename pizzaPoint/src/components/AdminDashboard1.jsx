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
  const [displayType, setDisplayType] = useState("placed");
  const [audioEnabled, setAudioEnabled] = useState(false);

  const StatusOptions = {
    PREPARING: "Preparing",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  const StatusOptionsPickup = {
    PREPARING: "Preparing",
    READY_FOR_PICKUP: "Ready for Pickup",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
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
    // setAudioEnabled(true);
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
        const newOrders =
          displayType == "placed"
            ? await adminService.getAllOrders()
            : await adminService.getAllOrdersByStatus(displayType);
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
        for (const order of newOrders) {
          for (const item of order.orderItems) {
            if (!names[item.menuItemId]) {
              const response = await adminService.getMenuItemById(
                item.menuItemId
              );
              names[item.menuItemId] = response.name + " " + response.size;
              //   console.log(names[item.menuItemId]);
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
  }, [displayType]);

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

  const Dateoptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const options = {
    // day: "2-digit",
    // month: "short",
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const handleGetByStatus = (status) => async () => {
    try {
      const response = await adminService.getAllOrdersByStatus(status);
      setOrders(response);
      setDisplayType(status);
    } catch (error) {
      console.error("Error fetching orders by status:", error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await adminService.updateOrderStatus(id, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === id ? { ...order, status } : order
        )
      );
      console.log("Order status updated successfully:", response);
    } catch (error) {
      console.error("Error updating order status:", error);
      // Optionally, you can show an error message to the user
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <AdminNavbar propIsOpen={isOpen} />
      {!audioEnabled && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50"
          onClick={() => {
            audioRef.current = new Audio("/notification.mp3");
            audioRef.current.play();
            setAudioEnabled(true);
          }}
        >
          Enable Notifications
        </button>
      )}
      {/* You can test interaction manually too */}
      {/* <button onClick={playSound}>Test Sound</button> */}
      <div className="h-auto mt-32 w-11/12 p-6 rounded-lg border-2 shadow-lg mx-auto">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Orders</h2>
          <div className="bg-gray-200 flex rounded-lg">
            <h3
              className={`${
                displayType == "placed" ? "bg-black text-white" : null
              } rounded-l-lg py-2 px-5`}
              onClick={handleGetByStatus("placed")}
            >
              Placed
            </h3>
            <h3
              className={`${
                displayType == "delivered" ? "bg-black text-white" : null
              } p-2 border-x-2 border-gray-300`}
              onClick={handleGetByStatus("delivered")}
            >
              Delivered
            </h3>
            <h3
              className={`${
                displayType == "cancelled" ? "bg-black text-white" : null
              } p-2 rounded-r-lg`}
              onClick={handleGetByStatus("cancelled")}
            >
              Cancelled
            </h3>
          </div>
        </div>

        <div className="mt-7">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Time</th>
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
                      {new Date(item.createdAt).toLocaleString(
                        "en-US",
                        options
                      )}
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
                          {item.orderType == "DELIVERY" ? Object.keys(StatusOptions).map((key) => (
                            <option key={key} value={key}>
                              {StatusOptions[key]}
                            </option>
                          )): Object.keys(StatusOptionsPickup).map((key) => (
                            <option key={key} value={key}>
                                {StatusOptionsPickup[key]}
                            </option>
                          ))}        
                        </select>
                      )}
                      {item.status == "PLACED" && (
                        <div className="flex items-center gap-3 text-2xl">
                          <button
                            className="text-green-500 hover:text-green-700 hover:scale-110"
                            onClick={() =>
                              updateOrderStatus(item.orderId, "PREPARING")
                            }
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              updateOrderStatus(item.orderId, "CANCELLED")
                            }
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>

                  {openRows.includes(item.orderId) && (
                    <tr className="bg-gray-50 border-t">
                      <td
                        colSpan={7}
                        className="py-4 px-6 text-sm text-gray-600"
                      >
                        <div className="space-y-2">
                          <p>
                            <strong>Order ID:</strong> #{item.orderId}
                          </p>
                          <p>
                            <strong>Phone:</strong> {item.user.phone}
                          </p>
                          {item.address && (
                            <p>
                              <strong>Location:</strong>{" "}
                              {item.address.buildingName}, Street -{" "}
                              {item.address.street}, Floor -{" "}
                              {item.address.floor}, Intercom -{" "}
                              {item.address.intercom}
                            </p>
                          )}
                          <p>
                            <strong>OrderType:</strong> {item.orderType}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {new Date(item.createdAt).toLocaleString(
                              "en-US",
                              Dateoptions
                            )}
                          </p>
                          <p>
                            <strong>Payment Method:</strong>{" "}
                            {item.paymentMethod}
                          </p>
                          <p>
                            <strong>Order:</strong>
                          </p>
                          {item.orderItems.map((orderItem, index) => (
                            <p key={index} className="text-sm">
                              <span className="font-medium">
                                {menuNames[orderItem.menuItemId] ||
                                  "Loading..."}{" "}
                                (x{orderItem.quantity})
                              </span>
                              {orderItem.extras?.length > 0 && (
                                <span className="text-gray-500">
                                  {" "}
                                  — Extras:{" "}
                                  {orderItem.extras
                                    .map((e) => e.name)
                                    .join(", ")}
                                </span>
                              )}
                            </p>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard1;
