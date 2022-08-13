export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const STARTLOADING = "STARTLOADING";
export const STOPLOADING = "STOPLOADING";

export const login = (userData) => {
  return {
    type: LOGIN,
    payload: userData,
  };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const startLoading = (message = "Loading....") => {
  return { type: STARTLOADING, payload: message };
};

export const stopLoading = () => {
  return { type: STOPLOADING };
};
