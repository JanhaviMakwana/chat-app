import * as actionTypes from "./actionTypes";

export const initialState = {
  user: null,
  isAuthenticated: false,
  socket: null,
  messages: null,
  receiver: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    }

    case actionTypes.AUTH_FAIL: {
      return {
        ...state,
        error: action.error,
      };
    }

    case actionTypes.SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    case actionTypes.REMOVE_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    case actionTypes.SET_SOCKET: {
      return {
        ...state,
        socket: action.socket,
      };
    }

    case actionTypes.SET_MESSGAES: {
      return {
        ...state,
        messages: action.messages,
      };
    }

    case actionTypes.SET_RECEIVER: {
      return {
        ...state,
        receiver: action.receiver,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
