import { useEffect } from "react";
import * as eventTypes from "./eventTypes";
import * as actionTypes from "../store/actionTypes";

const useSocket = (user, dispatch) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.addEventListener("open", (e) => {
      dispatch({ type: actionTypes.SET_SOCKET, socket: socket });
      socket.send(JSON.stringify({ type: eventTypes.CONNECT, user: user }));
      socket.addEventListener("message", (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case eventTypes.MESSAGE_RECEIVED: {
            socket.send(
              JSON.stringify({ type: eventTypes.GET_MESSAGES, userId: user.id })
            );
            break;
          }
          case eventTypes.MESSAGES: {
            dispatch({
              type: actionTypes.SET_MESSGAES,
              messages: data.messages,
            });
            break;
          }

          case eventTypes.ONLINE_FRIEND: {
            console.log("Online friend...........");
            dispatch({
              type: actionTypes.SET_RECEIVER,
              receiver: data.receiver,
            });
            break;
          }
          default:
            return;
        }
      });
    });
  }, [dispatch, user]);
};

export default useSocket;
