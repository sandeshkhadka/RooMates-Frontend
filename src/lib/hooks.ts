import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ApplicationDispatch, ApplicationState } from "./store";

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;

export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useContributions = () => {
  return useAppSelector((state) => state.contribution.entities);
};
export const useTasks = () => {
  return useAppSelector((state) => state.tasks.entities);
};
export const useUsers = () => {
  return useAppSelector((state) => state.users.userList);
};
export const useChat = () => {
  return useAppSelector((state) => state.chat);
};
export const useDashboard = () => {
  return useAppSelector((state) => state.dashboard);
};
export const useUsername = (id: string) => {
  const userList = useUsers();
  const user = userList.find((user) => user.id === id);
  const username = user?.username;
  if (!username) return "user not found";
  return username;
};
