import axios from "axios";
import { store } from "../redux/store";
import { updateAccessToken, logout } from "../redux/user/userSlice";
import { URL } from "../constants/constants";
import { URL } from "./../constants/constants";

const api = axios.create({
  baseURL: `${URL}/api/v1`,
  withCredentials: true,
});

// Request interceptor to add Authorization header with the latest token from Redux
api.interceptors.request.use((config) => {
  const accessToken = store.getState().user.currentUser?.data?.accessToken;

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "jwt expired"
    ) {
      try {
        console.log("Token expired. Refreshing...");

        const refreshToken =
          store.getState().user.currentUser?.data?.refreshToken; // Fetch latest from Redux

        if (!refreshToken) {
          console.log("No refresh token found, logging out...");
          store.dispatch(logout()); // Clear Redux on failure
          return Promise.reject(error);
        }

        // Send refresh token request to backend
        const { data } = await axios.post(`${URL}/api/v1/users/refreshToken`, {
          refreshToken,
        });

        // Update Redux store with new access token
        console.log("changing access token in store");
        store.dispatch(updateAccessToken(data.accessToken));

        console.log("new access token", data.accessToken);

        // Retry failed request with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        store.dispatch(logout()); // Logout on failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
