import { apiService } from "./api";

export const UserService = {
  getUsers: () => apiService.private.get(`/users`),
};
