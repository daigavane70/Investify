import { LOGIN, LOGOUT, STARTLOADING, STOPLOADING } from "./actions";

const initialState = {
  token: localStorage.getItem("usertoken"),
  isAuthenticated: false,
  userData: {},
  loading: false,
  loadingMessage: "Loading...",
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN: {
      return {
        ...state,
        isAuthenticated: true,
        userData: payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("usertoken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userData: null,
      };
    }
    case STARTLOADING: {
      return {
        ...state,
        loadingMessage: payload,
        loading: true,
      };
    }
    case STOPLOADING: {
      return {
        ...state,
        loading: false,
        loadingMessage: initialState.loadingMessage,
      };
    }
    default:
      return state;
  }
}
