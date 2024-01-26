import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import CommonGrid from "../components/CommonGrid";
import CommonCard from "../components/CommonCard";
import { Grid } from "@mui/material";
import TextInput from "../components/TextInput";

const SocketNotfication = () => {
  const [notifications, setNotifications] = useState([]);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  // const socket = io("http://localhost:3001"); // dev
  const socket = io("https://socket-app-wzpa.onrender.com");// live 

  const simulateNotification = (postDta) => {
    console.log("postDta **", postDta);
    setModalOpen(false);
    // Simulate a new notification and send it through the WebSocket connection
    const simulatedNotification = { message: postDta };
    socket.emit("notification", simulatedNotification);
  };

  useEffect(() => {
    console.log("notifications **", notifications);
  }, [notifications]);

  useEffect(() => {
    // Set up the event listener
    const notificationListener = (newNotification) => {
      console.log("Received notification client:", newNotification?.message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification?.message,
      ]);
    };

    // Add the event listener
    socket.on("notification", notificationListener);

    // socket.on("connect", () => {
    //   console.log("Connected to Socket.IO server");
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected from Socket.IO server");
    // });

    return () => {
      console.log("Cleaning up Socket.IO connection");
      socket.off("notification", notificationListener);
      //socket.disconnect(); // Disconnect the socket if needed
    };
  }, []);

  const openModal = () => {
    setDescriptionText("");
    setTitleText("");
    setErrorText("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleDescriptionChange = (event) => {
    setErrorText("");
    setDescriptionText(event.target.value);
  };
  const handleTitleChange = (event) => {
    setErrorText("");
    setTitleText(event.target.value);
  };
  const hasOnlySpaces = (value) => {
    const spacePattern = /^\s*$/;
    return spacePattern.test(value);
  };

  const validation = () => {
    const spaceonlyTitle = hasOnlySpaces(titleText);
    const spaceonlyDec = hasOnlySpaces(descriptionText);
    if (titleText === "" || spaceonlyTitle) {
      setTitleText("");
      setErrorText("errpr");
      return;
    }
    if (descriptionText === "" || spaceonlyDec) {
      setDescriptionText("");
      setErrorText("errpr");
      return;
    }
    const postDta = {
      title: titleText,
      body: descriptionText,
    };
    simulateNotification(postDta);
  };
  const modalView = () => {
    return (
      <div
        style={{
          display: isModalOpen ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "white",
            borderRadius: "8px",
            width: "50%",
          }}
        >
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <button onClick={closeModal}>Close</button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2>Post a message</h2>

            <TextInput
              variant="outlined"
              label="Title"
              placeholder="Please enter a Title"
              value={titleText}
              onChange={handleTitleChange}
              inputStyle={{ width: "90%" }}
            />
            {titleText == "" && errorText != "" && (
              <p style={{ color: "red", fontSize: 13 }}>Please enter a Title</p>
            )}

            <TextInput
              variant="outlined"
              label="Description"
              placeholder="Please enter a Description"
              value={descriptionText}
              onChange={handleDescriptionChange}
              inputStyle={{ width: "90%", marginTop: 33 }}
            />
            {descriptionText == "" && errorText != "" && (
              <p style={{ color: "red", fontSize: 13 }}>
                Please enter a Description
              </p>
            )}
            <button
              style={{
                height: 50,
                margin: 30,
                width: "50%",
                backgroundColor: "#F6E4D0",
                borderRadius: "10px",
              }}
              onClick={validation}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button
        style={{ marginLeft: 20, marginTop: 30 }}
        onClick={openModal} //openModalsimulateNotification
      >
        Simulate Notification
      </button>
      <CommonGrid gridStyle={{ height: "" }}>
        {notifications?.map((item, index) => (
          <Grid key={index} item lg={3}>
            <CommonCard
              key={index}
              titleText={item?.title || ""}
              descriptionText={item?.body || ""}
            />
          </Grid>
        ))}
      </CommonGrid>
      {modalView()}
    </div>
  );
};
export default SocketNotfication;
