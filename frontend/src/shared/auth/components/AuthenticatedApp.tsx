import { lazy } from "react";
import { isAdmin } from "../../helper/util";

const Admin = lazy(() => import("../../../modules/admin/home/Home"));

const AuthenticatedApp = () => {
  return <>{isAdmin("admin") && <Admin />}</>;
};

export default AuthenticatedApp;
