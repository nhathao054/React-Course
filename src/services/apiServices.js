import axios from "../utils/axiosCustomize";

const postCreateUser = (email, password, userName, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const getListUser = () => {
  return axios.get("api/v1/participant/all");
};

const getListUserPatinate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const putUpdateUser = (id, userName, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const deleteUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id: id } });
};

const login = (email, password) => {
  return axios.post("api/v1/login", { email, password, delay: 3000 });
};

const register = (email, password, username) => {
  return axios.post("api/v1/register", { email, password, username });
};

const getListQuiz = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getQuizById = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

export {
  postCreateUser,
  getListUser,
  putUpdateUser,
  deleteUser,
  getListUserPatinate,
  login,
  register,
  getListQuiz,
  getQuizById,
};
