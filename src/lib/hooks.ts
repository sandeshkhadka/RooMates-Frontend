import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ApplicationDispatch, ApplicationState } from "./store";

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;


export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};
