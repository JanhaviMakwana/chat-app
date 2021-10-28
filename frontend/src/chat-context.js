import { createContext, useReducer } from "react";

import reducer, { initialState } from "./store/reducer";

const ChatContext = createContext();

export const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export const withState = (Child) => (props) => (
  <ChatContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </ChatContext.Consumer>
);
