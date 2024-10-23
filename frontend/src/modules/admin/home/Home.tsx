import { Outlet, Route, Routes } from "react-router-dom";

import Header from "../../../shared/header/Header";
import Sidebar from "../../../shared/sidebar/Sidebar";
import NotFound from "../../../shared/not-found/NotFound";
import { useUser } from "../../../shared/provider/user-provider/UserProvider";
import Loader from "../../../shared/loader/Loader";

import Profile from "../../../components/profile/components/Profile";
import AchivementList from "../../../components/achivement-list/AchivementList";
import Achivements from "../../../components/achivements/Achivements";
import Dashboard from "../../../components/dashboard/Dashboard";

const Home = () => {
  const { isFetching }: any = useUser();

  if (isFetching) {
    return (
      <div className="text-2xl flex items-center h-screen justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="lg:pl-72 md:py-[35px] py-[22px] px-4 sm:px-6 lg:px-[30px]">
        <Routes>
          <Route path="" element={<Outlet />}>
            <Route index element={<Dashboard />} />

            <Route path="profile" element={<Profile />} />
            <Route path="achivements" element={<Achivements />} />
            <Route path="achivement-list" element={<AchivementList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Sidebar />
    </>
  );
};

export default Home;
