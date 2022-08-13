import axios from "axios";

const backend = axios.create({
  // baseURL: `https://xenia-mcq-22.herokuapp.com/api`,
  // baseURL: `http://localhost:4000/api`,
});

export const login = (data) => {
  return backend.post("/auth/login", data);
};

export const getUserByToken = (token) => {
  return backend.get("/auth/profile", {
    headers: { authorization: "Bearer " + token },
  });
};

export const getAllContests = () => {
  return backend.get("/contest/");
};

export const getContestById = (id) => {
  return backend.get("/contest/" + id);
};

export const getInstructions = (id) => {
  return backend.get("/instruction/" + id);
};

export const getQuestions = () => {
  return backend.get("/");
};

export const getUserParticipations = (userId) => {
  return backend.get("/participant/user/" + userId);
};

export const checkIfUserRegisteredForContest = (userId, contestId) => {
  return backend.get(`/participant/${userId}/${contestId}`);
};

export const enterContest = (userId, contestId) => {
  return backend.post(`/participant/entercontest/${contestId}/${userId}`);
};

export const getQuestionById = (questionId) => {
  return backend.get(`/question/${questionId}`);
};

export const bookmark = ({ questionId, userId, contestId, bookmark }) => {
  return backend.put("/participant/bookmark", {
    questionId,
    userId,
    contestId,
    bookmark,
  });
};

export const attempted = ({ questionId, attempted, userId, contestId }) => {
  return backend.put("/participant/attempted", {
    questionId,
    attempted,
    userId,
    contestId,
  });
};

export const clearAttempted = ({ questionId, userId, contestId }) => {
  return backend.put("/participant/clearattempted", {
    questionId,
    userId,
    contestId,
  });
};
