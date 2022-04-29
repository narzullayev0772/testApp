import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Link, Navigate } from "react-router-dom";
import GetPass from "./getpass/getpass";
import SignIn from "./signin/signin";
import SignUp from "./signup/signup";
import verify from "./verify";
import Dashboard from "./pages/dashboard";
import Profile from "./profile/profile";
import Chat from "./chat/chat";
import "./app.css";
import socketio from "socket.io-client";

function App() {
  const [data, setData] = useState(null);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    var socket = socketio("http://localhost:5000");
    socket.on("connect", () => {
      console.log(`I'm connected with the back-end`);
    });
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  // verify user login
  useEffect(() => {
    verify(setData);
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
      <Route
          path={"/"}
          exact
          element={
            data ? (
              data.data.type === "seller" ? (
                <Dashboard socket={socket} />
              ) : (
                <Dashboard children={<Chat socket={socket} />} />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        ></Route>
        <Route
          path={"/dashboard"}
          exact
          element={
            data ? (
              data.data.type === "seller" ? (
                <Dashboard socket={socket} />
              ) : (
                <Dashboard children={<Chat socket={socket} />} />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        ></Route>
        <Route
          path="/dashboard/:type"
          exact
          element={data && <Dashboard socket={socket} />}
        ></Route>
        <Route
          path="/user/:username"
          exact
          element={data && <Dashboard socket={socket} children={<Profile />} />}
        ></Route>
        <Route
          path="/chat/:username"
          exact
          element={
            data && (
              <Dashboard socket={socket} children={<Chat socket={socket} />} />
            )
          }
        ></Route>
        <Route
          exact
          path="/signin"
          element={
            data ? <Navigate to="/dashboard" /> : <SignIn setData={setData} />
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/getpass" element={<GetPass />}></Route>
        <Route
          path="*"
          element={
            <main
              style={{
                margin: "0",
                padding: "0px",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#123",
              }}
            >
              <h2>404 | No Page</h2>

              <Link
                to={"/signin"}
                style={{
                  margin: "10px",
                  padding: "5px",
                  color: "#0088cc",
                }}
              >
                Go to main page
              </Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
