import { useEffect } from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MessengerHeader from "./MessengerHeader";
import MessengerBody from "./MessengerBody";
import MessengerInput from "./MessageInput";
import { withState } from "../../chat-context";
import * as eventTypes from "../../socket/eventTypes";

const styles = makeStyles({
  container: {
    margin: "10px 0",
    width: "100%",
    padding: "10px",
    height: "100%",
  },
});

const Messenger = (props) => {
  const classes = styles();
  const { socket, user } = props.state;

  useEffect(() => {
    socket &&
      socket.send(
        JSON.stringify({ type: eventTypes.GET_MESSAGES, userId: user.id })
      );
  }, [socket, user.id]);

  const sendMessage = (text) => {
    if (props.state.receiver) {
      props.state.socket.send(
        JSON.stringify({
          type: eventTypes.SEND_MESSAGE,
          message: {
            user1: props.state.user.id,
            user2: props.state.receiver,
            text: text,
          },
        })
      );
    } else {
      alert("User is not Online!");
    }
  };

  return (
    <Container className={classes.container}>
      <MessengerHeader />
     {/*  <MessengerBody messages={messages} /> */}
      <MessengerBody messages={props.state.messages} />
      <MessengerInput addMessage={sendMessage} />
    </Container>
  );
};
export default withState(Messenger);
