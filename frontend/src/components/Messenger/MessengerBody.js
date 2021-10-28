import React, { useEffect, useRef } from "react";
import { List, ListItem, ListItemText, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { withState } from "../../chat-context";

const styles = makeStyles({
  container: {
    width: "100% !important",
    display: "grid !important",
    gridTemplateColumns: "auto !important",
    gridTemplateRows: "auto auto !important",
    height: "600px",
    padding: "10px 0 !important",
    marginBottom: "auto !important",
    margin: "auto !important",
  },
  messages: {
    overflowY: "scroll !important",
    width: "96%",
    padding: "3px 18px !important",
  },
  message: {
    backgroundColor: "lightgray",
    width: "fit-content !important",
    border: "1px solid black",
    borderRadius: "22px",
    margin: "5px 0 !important",
  },
});

const MessengerBody = (props) => {
  const classes = styles();
  const myRef = useRef();
  const { user } = props.state;

  useEffect(() => {
    myRef.current.scrollTop = myRef.current.scrollHeight;
  }, [props.messages]);
  return (
    <Container className={classes.container}>
      <List className={classes.messages} ref={myRef}>
        {props.messages &&
          props.messages.map((msg) => {
            return (
              <ListItem
                key={msg._id}
                className={classes.message}
                sx={{
                  marginLeft: msg.user1 === user.id && "auto !important",
                }}
              >
                <ListItemText>{msg.text}</ListItemText>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
};
export default withState(MessengerBody);
