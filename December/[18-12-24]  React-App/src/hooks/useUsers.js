import { useQuery, useMutation, useQueryClient } from "react-query";
import { UserService } from "../api/userService";

export const useUsers = () => {
  return useQuery("users", UserService.getUsers);
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(UserService.createUser, {
    onSuccess: (newUser) => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(UserService.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(UserService.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};
