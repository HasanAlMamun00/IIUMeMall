import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import NotFound from "../shared/NotFound";
import Login from "../Page/Login/Login";
import Register from "../Page/register/Register";
import Cafes from "../Page/Cafes/Cafes";
import AddProduct from "../Page/AddProduct/AddProduct";
import MyProduct from "../Page/MyProduct/MyProduct";
import Stores from "../Page/Stores/Stores";
import CafeDetails from "../Page/Cafes/CafeDetails";
import StoresDetails from "../Page/Stores/StoresDetails";
import ContactUs from "../Page/ContactUs/ContactUs";
import Cart from "../Page/Cart/Cart";
import Profile from "../Page/Profile/Profile";
import AllUsers from "../Page/AllUsers/AllUsers";
import Payment from "../Page/Payment/Payment";
import PurchaseHistory from "../Page/PurchaseHistory/PurchaseHistory";
import Order from "../Page/Order/Order";
import AllContacts from "../Page/AllContacts/AllContacts";
import WishList from "../Page/wishList/WishList";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Cafes />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/my-product",
        element: <MyProduct />
      },
      {
        path: "/wish-list",
        element: <WishList />,
      },
      {
        path: "/store",
        element: <Stores />,
      },
      {
        path: "/cafeDetails",
        element: <CafeDetails />
      },
      {
        path: "/storeDetails",
        element: <StoresDetails />
      },
      {
        path: "/contact-us",
        element: <ContactUs />
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/all-users",
        element: <AllUsers />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/purchase-history",
        element: <PurchaseHistory />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/all-contacts",
        element: <AllContacts />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  

]);

export default router;
