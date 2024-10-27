import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import withAuthentication from "./shared/hoc/withAuthentication";
import withoutAuthentication from "./shared/hoc/withoutAuthentication";
import { UserProvider } from "./shared/provider/user-provider/UserProvider";
import Login from "./shared/auth/components/Login";
import NotFound from "./shared/not-found/NotFound";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SignUp from "./shared/auth/components/SignUp";
import UserLogin from "./modules/users/auth/login/UserLogin";
import { signIn, signUp } from "./shared/auth/api";
import UserSignup from "./modules/users/auth/signup/UserSignup";
import AuthenticatedApp from "./shared/auth/components/AuthenticatedApp";
import GenerateAchivement from "./components/generate-achivement/GenerateAchivement";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const queryClient = new QueryClient();

  const Authenticated = () => {
    return (
      <UserProvider>
        <AuthenticatedApp />
      </UserProvider>
    );
  };

  const UnAuthenticatedApp = () => <Outlet />;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/*" element={withAuthentication(Authenticated)}>
                <Route element={<Dashboard />} />
              </Route>
              <Route
                path={"admin"}
                element={withoutAuthentication(UnAuthenticatedApp)}
              >
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route
                path="generate-achivement"
                element={<GenerateAchivement />}
              />

              <Route
                path={"user"}
                element={withoutAuthentication(UnAuthenticatedApp)}
              >
                <Route path="login" element={<UserLogin onSubmit={signIn} />} />
                <Route
                  path="signup"
                  element={<UserSignup onSubmit={signUp} />}
                />
              </Route>
            </Routes>
          </Router>
        </UserProvider>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
