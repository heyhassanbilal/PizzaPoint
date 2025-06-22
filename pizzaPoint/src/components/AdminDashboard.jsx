import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminCard from "./AdminCard";
import { useAuth } from "../utils/useAuth";

function AdminDashboard() {
  const [previousOrderCount, setPreviousOrderCount] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const audioRef = useRef(null);
  const [openRows, setOpenRows] = useState([]);
  const [menuNames, setMenuNames] = useState({});
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const StatusOptions = {
    PENDING: "Pending",
    PLACED: "Placed",
    PREPARING: "Preparing",
    READY_FOR_PICKUP: "Ready for Pickup",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const toggleRow = (id) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(id)
        ? prevOpenRows.filter((rowId) => rowId !== id)
        : [...prevOpenRows, id]
    );
  };

  useEffect(() => {
    const initAudio = async () => {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);

        // Load audio file
        const response = await fetch("/notification.mp3");
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await ctx.decodeAudioData(arrayBuffer);
        setAudioBuffer(buffer);
      } catch (err) {
        console.error("Audio initialization failed:", err);
      }
    };

    initAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(
        `https://pizzapoint-c71ca9db8a73.herokuapp.com/api/orders/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(status),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      const updated = await response.text();

      setData((prevData) =>
        prevData.map((order) =>
          order.orderId === id ? { ...order, status: status } : order
        )
      );

      return updated;
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
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

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      try {
        const response = await fetch(
          `https://pizzapoint-c71ca9db8a73.herokuapp.com/api/orders/all/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const json = await response.json();

        // Check if new orders arrived
        if (audioBuffer && json.length > previousOrderCount) {
          playNotificationSound();
        }

        setPreviousOrderCount(json.length);
        setData([...json]);

        const names = {};
        for (const order of json) {
          for (const item of order.orderItems) {
            if (!names[item.menuItemId]) {
              names[item.menuItemId] = await fetchMenuData(item.menuItemId);
            }
          }
        }
        setMenuNames(names);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Error fetching data:", error.message);
        }
      }
    }

    // Initial fetch
    fetchData();

    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    return () => {
      controller.abort();
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [token, previousOrderCount]);

  const playNotificationSound = () => {
    if (!audioContext || !audioBuffer) return;

    try {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      console.log("Sound played successfully");
    } catch (err) {
      console.error("Failed to play sound:", err);

      // Fallback to HTML5 Audio
      try {
        const audio = new Audio("/notification.mp3");
        audio
          .play()
          .catch((e) => console.log("HTML5 Audio fallback failed:", e));
      } catch (fallbackErr) {
        console.error("Both audio methods failed:", fallbackErr);
      }
    }
  };

  useEffect(() => {
    console.log("Audio system state:", {
      audioEnabled,
      audioContext: !!audioContext,
      audioBuffer: !!audioBuffer,
      fallbackReady: audioReady,
    });
  }, [audioEnabled, audioContext, audioBuffer, audioReady]);

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/notification.mp3"
        preload="auto"
        onError={() => setAudioError("Failed to load audio")}
        onCanPlayThrough={() => {
          setAudioReady(true);
          setAudioError(null);
        }}
        style={{ display: "none" }}
      />
      {audioError && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white p-2 rounded">
          Audio Error: {audioError}
        </div>
      )}
      {!audioEnabled && (
        <button
          onClick={async () => {
            try {
              // This user interaction will enable future audio
              await playNotificationSound();
              setAudioEnabled(true);
              console.log("Audio enabled successfully");
            } catch (e) {
              console.error("Audio enable failed:", e);
              alert("Please allow audio in your browser settings");
            }
          }}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50"
        >
          🔔 Enable Sound Notifications
        </button>
      )}
      <div>
        <AdminNavbar />
        <AdminSidebar />
        <div className="flex flex-col gap-9 w-screen min-h-screen mt-24 ml-24 overflow-y-auto pr-4">
          <div className="flex gap-5 w-full ">
            {[...Array(4)].map((_, i) => (
              <AdminCard
                key={i}
                title="Total Menus"
                number="120"
                bgColor="black"
                percentage={45}
                iconClass={"fa-regular fa-file"}
              />
            ))}
          </div>

          <div className="h-auto w-11/12 p-6 rounded-lg border-2 shadow-lg">
            <div className="flex justify-between">
              <h2 className="font-semibold text-xl">Order List</h2>
              <div className="bg-gray-200 flex rounded-lg">
                <h3 className="bg-black text-white rounded-l-lg p-2">
                  Monthly
                </h3>
                <h3 className="p-2 border-x-2 border-gray-300">Weekly</h3>
                <h3 className="p-2 rounded-r-lg">Today</h3>
              </div>
            </div>

            <div className="mt-7">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status Order</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
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
                        <td className="py-4">{item.user.name}</td>
                        <td className="py-4">{item.address?.buildingName || "N/A"}</td>
                        <td className="py-4">{item.totalPrice} HUF</td>
                        <td className="py-4">
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
                              <p>
                                <strong>Location:</strong>{" "}
                                {item.address.buildingName}, Street -{" "}
                                {item.address.street}, Floor -{" "}
                                {item.address.floor}, Intercom -{" "}
                                {item.address.intercom}
                              </p>
                              <p>
                                <strong>OrderType:</strong> {item.orderType}
                              </p>
                              <p>
                                <strong>Payment Method:</strong>{" "}
                                {item.paymentMethod}
                              </p>
                              <p>
                                <strong>Order:</strong>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
