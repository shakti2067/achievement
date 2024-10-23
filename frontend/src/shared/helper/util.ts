import { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { ADMIN, TOKEN, USER } from "./constant";
import moment from "moment";

const getItemFromCookie = (key: string) => {
  return Cookies.get(key);
};

const setToken = (token: string) => {
  return Cookies.set(TOKEN, token);
};

const removeItemInCookie = (key: string) => Cookies.remove(key);

const clientConfig = (config: InternalAxiosRequestConfig) => {
  const token = getItemFromCookie(TOKEN);

  if (token) {
    config.headers = config.headers ?? {};
    config.headers[`Authorization`] = "Bearer " + token;
  }

  return config;
};

const handleAxiosError = () => {
  removeItemInCookie(TOKEN);
};

// style={dropDownArrowStyle}
const dropDownArrowStyle = {
  dropdownIndicator: (
    base: any,
    state: { selectProps: { menuIsOpen: any } }
  ) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
};

function capitalizeFirstLetter(str: string | undefined): string {
  if (str) {
    return str.charAt(0).toUpperCase();
  }
  return "";
}

const dateConvert = (epochTime: any) => {
  if (!epochTime) {
    return "-";
  }
  const date = moment.unix(epochTime);
  return date.isValid() ? date.format("DD MMMM YYYY") : "-";
};

const timeConvert = (epochTime: any) => {
  if (!epochTime) {
    return "-";
  }
  const date = moment.unix(epochTime);
  return date.isValid() ? date.format("hh:mm A") : "-";
};

const isAdmin = (currentUserRole: string) => {
  return currentUserRole === ADMIN;
};

const isUser = (currentUserRole: string) => {
  return currentUserRole === USER;
};

const getUserRoleFromUrl = () => {
  const path = window.location.pathname;
  if (path.includes("admin")) {
    return ADMIN;
  }
  return USER;
};

const getPrefixPathFromUserRole = () => {
  const userRole = getUserRoleFromUrl();
  const prefixPath = userRole === ADMIN ? "/admin" : "";
  return prefixPath;
};

export const formatDate = (dateString: moment.MomentInput) => {
  return moment(dateString).format("MM/DD/YYYY");
};

export function formatTime(timeString: moment.MomentInput) {
  return moment(timeString).format("h:mm:ss a");
}

// export const formatNameForURL = (name: string): string => {
//   return name
//     .toLowerCase()
//     .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters
//     .trim()
//     .replace(/\s+/g, '-') // Replace spaces with hyphens
//     .slice(0, 50); // Optional: limit the length of the URL
// };


export {
  removeItemInCookie,
  clientConfig,
  getItemFromCookie,
  handleAxiosError,
  dropDownArrowStyle,
  capitalizeFirstLetter,
  setToken,
  dateConvert,
  timeConvert,
  isAdmin,
  isUser,
  getUserRoleFromUrl,
  getPrefixPathFromUserRole,
};
