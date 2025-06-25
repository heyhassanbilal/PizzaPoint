import React, { useEffect, useState, useRef } from "react";
import AdminNavbar from "./AdminNavbar";
import { adminService } from "../utils/services/adminService";
import { useAuth } from "../utils/useAuth";

function AdminDashboard1() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const previousOrderIds = useRef(new Set());
  const [orders, setOrders] = useState([]);

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
    </div>
  );
}

export default AdminDashboard1;
