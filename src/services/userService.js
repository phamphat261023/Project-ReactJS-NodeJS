import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("check data from service: ", data);
  return axios.post("/api/create-users", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const updateUserService = (data) => {
  return axios.put("/api/update-user", data);
};

export {
  handleLoginAPI,
  getAllUser,
  createNewUserService,
  deleteUserService,
  updateUserService,
};
