import axios from "axios";
import nProgress from "nprogress";
import { store } from "../redux/store";

nProgress.configure({
  showSpinner: false,
  // easing: "ease",
  // speed: 500,
  // trickleRate: 0.5,
  trickleSpeed: 300,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    nProgress.start();
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = "Bearer " + access_token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    nProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    nProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
