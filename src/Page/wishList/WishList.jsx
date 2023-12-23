import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import WishlistDetails from "./WishlistDetails";

const WishList = () => {
  const { user } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(`https://kind-pear-gorilla-kilt.cyclic.app/wishlist/${user}`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, [user]);


  return (
    <>
      {
        menuItems?.data?.length == 0 ?
          <h1 className="text-center font-semibold mt-10 text-2xl">You have <strong className="underline">0</strong> item</h1>
          :
          <div className="grid grid-cols-3 gap-5">
            {menuItems?.data?.map((item) => <WishlistDetails key={item?._id} item={item} />)}
          </div>
      }
    </>
  );
};

export default WishList;
