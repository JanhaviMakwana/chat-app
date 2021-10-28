import React from "react";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import Messenger from "../Messenger/Messenger";
import { withState } from "../../chat-context";
import useSocket from "../../socket/socketConnect";
const styles = makeStyles({
  container: {
    height: "97vh",
    margin: "0 auto !important",
    paddingBottom: "0 !important",
  },
});
const Chat = React.memo((props) => {
  const classes = styles();
  useSocket(props.state.user, props.dispatch);
  return (
    <Container className={classes.container}>
      <Messenger />
    </Container>
  );
});

export default withState(Chat);
