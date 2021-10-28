const Message = require("../models/message");
const {
  CONNECT,
  SEND_MESSAGE,
  MESSAGE_RECEIVED,
  GET_MESSGAES,
  MESSAGES,
  ONLINE_FRIEND,
} = require("./eventTypes");
const WebSocket = require("ws");
const users = new Map();
const getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

const WebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server: server });

  wss.on("connection", (ws) => {
    console.log("connected user!");
    ws.id = getUniqueID();

    ws.on("message", function incoming(message) {
      const data = JSON.parse(message);
      console.log("received %s", data);

      switch (data.type) {
        case CONNECT: {
          users.set(data.user.id, { id: data.user.id, socket: ws.id });
          users.forEach((user) => {
            if (user.id !== data.user.id) {
              const onlineFriend = users.get(user.id);
              onlineFriend &&
                ws.send(
                  JSON.stringify({
                    type: ONLINE_FRIEND,
                    receiver: onlineFriend.id,
                  })
                );
              wss.clients.forEach((client) => {
                if (client.id === onlineFriend.socket) {
                  client.send(
                    JSON.stringify({
                      type: ONLINE_FRIEND,
                      receiver: data.user.id,
                    })
                  );
                }
              });
            }
          });
          break;
        }

        case SEND_MESSAGE: {
          const toUser = users.get(data.message.user2);
          const fromUser = users.get(data.message.user1);
          Message.create(data.message)
            .then((res) => {
              wss.clients.forEach(function each(client) {
                if (
                  client.id === toUser.socket ||
                  client.id === fromUser.socket
                ) {
                  client.send(JSON.stringify({ type: MESSAGE_RECEIVED }));
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }

        case GET_MESSGAES: {
          Message.find({
            $or: [{ user1: data.userId }, { user2: data.userId }],
          })
            .then((res) => {
              ws.send(JSON.stringify({ type: MESSAGES, messages: res }));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
  });

  /* ws.on("message", function incoming(message) {
    const data = JSON.parse(message);
    console.log("received %s", data);

    switch (data.type) {
    }
  }); */
};

module.exports = WebSocketServer;
