import api from "../../../shared/api";
import { ProfileFormProps } from "../types";

export const updateProfile = (data: ProfileFormProps) => {
  return api.patch(`/api/me`, data);
};
