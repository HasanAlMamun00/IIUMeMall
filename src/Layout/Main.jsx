import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import SideNavbar from "../shared/SideNavbar";

const Main = () => {
  return (
    <div className="flex">
      <div className="lg:max-w-[300px]">
        <SideNavbar></SideNavbar>
      </div>
      <div className="w-full lg:ml-[250px] xl:ml-[300px] px-6">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
