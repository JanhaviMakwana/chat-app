import { useState } from "react";
import { Container, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  container: {
    backgroundColor: "lightgray",
  },
});

const MessageInput = (props) => {
  const classes = styles();
  const [text, setText] = useState("");
  return (
    <Container className={classes.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addMessage(text);
          setText("");
        }}
      >
        <TextField
          variant="filled"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </Container>
  );
};
export default MessageInput;
