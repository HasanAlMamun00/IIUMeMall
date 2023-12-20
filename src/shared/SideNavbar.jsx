import logo from "../assets/logo.png";
import topVector from "../assets/top-vector.png";
import bottomVector from "../assets/bottom-vector.png";
import {
  FaPlus,
  FaRegCircle,
  FaRegHeart,
  FaRegUser,
  FaUsers,
} from "react-icons/fa";
import { LiaReceiptSolid } from 'react-icons/lia'
import {
  MdHistory,
  MdOutlineConnectWithoutContact,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { IoIosContacts, IoIosLogIn, IoMdAdd } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../Page/Context/AuthProvider";
import { GrDocumentDownload } from "react-icons/gr";

const SideNavbar = () => {

  const { user, logOut, role } = useContext(AuthContext)

  const usePathname = useLocation();
  const pathname = usePathname?.pathname;

  const handleLogOut = () => {
    logOut()
      .then(() => { window.location.reload(true); })
      .catch(err => console.error(err))
  }

  const menuItem = [
    // {
    //   id: 1,
    //   text: "Home",
    //   link: "/",
    //   icon: <IoHomeOutline />,
    // },
    {
      id: 2,
      text: "Cafes",
      link: "/",
      icon: <FaRegCircle />,
    },
    {
      id: 3,
      text: "Stores",
      link: "/store",
      icon: <FaRegHeart />,
    },
    {
      id: 4,
      text: "Cart",
      link: "/cart",
      icon: <MdOutlineShoppingCart />,
    },
    {
      id: 5,
      text: "Wish-lists",
      link: "/wish-list",
      icon: <CiCircleList />,
    },
    {
      id: 6,
      text: "Profile",
      link: "/profile",
      icon: <FaRegUser />,
    },
    {
      id: 7,
      text: "Purchase-History",
      link: "/purchase-history",
      icon: <MdHistory />,
    },
    {
      id: 8,
      text: "Contact us",
      link: "/contact-us",
      icon: <MdOutlineConnectWithoutContact />,
    }
  ];
  return (
    <div className="fixed top-0 left-0 h-screen p-5 lg:max-w-[250px] xl:max-w-[300px] shadow-2xl overflow-y-scroll">
      <div className="flex justify-center">
        <img src={logo} alt="" />
      </div>

      <ul className="mt-8">
        {menuItem?.map((item) => (
          <li key={item?.id} className="pb-3  hover-menu flex items-center">
            <div>
              {pathname == `${item?.link}` && (
                <hr className="w-px h-4 bg-[#0095FF] transform rotate-180 mr-4" />
              )}
            </div>
            <Link
              to={item?.link}
              className="text-gray-600 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300"
            >
              <span className="">{item.icon}</span>
              {item?.text}
            </Link>
          </li>
        ))}
      </ul>

      {
        role == 'seller' || role == 'admin' ?
          <div className="flex items-center">
            <div>
              {pathname == '/order' && (
                <hr className="w-px h-4 bg-[#0095FF] transform rotate-180 mr-4" />
              )}
            </div>
            <Link to='/order' className="text-gray-600 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300 pb-3"
            >
              <span className=""><LiaReceiptSolid /></span>
              Order
            </Link>
          </div>
          :
          ''
      }

      {
        role == 'seller' || role == 'admin' ?
          <div className="flex items-center">
            <div>
              {pathname == '/add-product' && (
                <hr className="w-px h-4 bg-[#0095FF] transform rotate-180 mr-4" />
              )}
            </div>
            <Link to='/add-product' className="text-gray-600 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300 pb-3"
            >
              <span className=""><IoMdAdd /></span>
              Add Product
            </Link>
          </div>
          :
          ''
      }

      {
        role == 'seller' || role == 'admin' ?
          <div className="flex items-center">
            <div>
              {pathname == '/my-product' && (
                <hr className="w-px h-4 bg-[#0095FF] transform rotate-180 mr-4" />
              )}
            </div>
            <Link to='/my-product' className="text-gray-600 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300 pb-3"
            >
              <span className=""><GrDocumentDownload /></span>
              My Product
            </Link>
          </div>
          :
          ''
      }

      {
        role == 'admin' ?
          <div className="flex items-center">
            <div>
              {pathname == '/all-users' && (
                <hr className="w-px h-4 bg-[#0095FF] transform rotate-180 mr-4" />
              )}
            </div>
            <Link to='/all-users' className="text-gray-600 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300 pb-3"
            >
              <span className=""><FaUsers /></span>
              All Users
            </Link>
          </div>
          :
          ''
      }

      {
        role == 'admin' ?
          <div className="flex items-center">
            <div>
              {pathname == '/all-contacts' && (
                <hr className="w-px h-4 bg-[#0095FF] transform rotate-180 mr-4" />
              )}
            </div>
            <Link to='/all-contacts' className="text-gray-600 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300 pb-3"
            >
              <span className=""><IoIosContacts /></span>
              All Contacts
            </Link>
          </div>
          :
          ''
      }

      {
        user ?
          <button
            onClick={() => handleLogOut()} className="text-red-500 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300"
          >
            <span className=""><CiLogout /></span>
            Log Out
          </button>
          :
          <Link
            to='/logIn'
            className="text-sky-800 text-[18px] font-semibold flex items-center gap-4 hover:text-gray-900 duration-300"
          >
            <span className=""><IoIosLogIn /></span>
            Log In
          </Link>
      }

      <div className="w-[200px] rounded-md pt-[17px] pb-[23px] bg-[#A1D2FF] h-[239px] relative mt-16">
        <img src={topVector} alt="" className="absolute top-0 left-0" />
        <img src={bottomVector} alt="" className="absolute right-0 bottom-0" />

        <div className="relative">
          <div className="w-[46px] h-[46px] rounded-full  border-[5px] border-white bg-[#00E0C6] flex items-center justify-center hover:bg-[#179e8e] duration-300 cursor-pointer mx-auto">
            <FaPlus color="#fff" size={24} />
          </div>

          <div className="text-center mt-3 px-7">
            <h2 className="text-[#016170] text-sm font-bold">Need Help</h2>
            <p className="text-[#016170] text-[12px] font-medium mt-4">
              About Account Management Ordering & Payment refund and FAQ
            </p>
            <button className="bg-[#D9F4FF] text-[#016170] text-[14px] font-semibold px-4 py-[10px] rounded-md mt-4 hover:text-gray-900 transition-colors">
              customer service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
