import { Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  container: {
    '& h5':{
        width: 'fit-content'
    }
  },
});
const MessengerHeader = (props) => {
  const classes = styles();
  return (
    <Container className={classes.container}>
      <Typography variant="h5">User</Typography>
    </Container>
  );
};
export default MessengerHeader;
