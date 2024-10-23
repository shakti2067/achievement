import { Navigate } from "react-router-dom";
import { TOKEN } from "../helper/constant";
import { getItemFromCookie } from "../helper/util";

const withoutAuthentication = (WrapedComponent: () => JSX.Element) => {
  const Component = () => {
    if (!getItemFromCookie(TOKEN)) {
      return <WrapedComponent />;
    }
    return <Navigate to={`/`} />;
  };

  return <Component />;
};

export default withoutAuthentication;
