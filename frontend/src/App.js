import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { withState } from "./chat-context";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./components/Chat/Chat";

function PrivateRoutes({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

function PublicRoutes({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoutes
            path="/signin"
            isAuthenticated={props.state.isAuthenticated}
            component={SignIn}
          />
          <PublicRoutes
            path="/signup"
            isAuthenticated={props.state.isAuthenticated}
            component={SignUp}
          />

          <PrivateRoutes
            path="/"
            isAuthenticated={props.state.isAuthenticated}
            component={Chat}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default withState(App);
