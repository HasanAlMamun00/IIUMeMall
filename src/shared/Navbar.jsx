import { CiSearch } from "react-icons/ci";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import profile from "../assets/4.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Page/Context/AuthProvider";
import { useLocation } from "react-router-dom";
import SearchItemCard from "./SearchItemCard";

const formatPath = (pathname) => {
  // Remove leading '/' and split the path by '/'
  const pathSegments = pathname.substring(1).split('/');

  // Capitalize the first letter of each word in the last segment
  const formattedPath = pathSegments[pathSegments.length - 1]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return formattedPath;
};

const Navbar = () => {

  const pathName = useLocation();
  const path = pathName?.pathname;
  const formattedPath = formatPath(path);

  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isFindDataOpen, setFindDataOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://localhost:5000/cafe/search?searchTerm=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setMenuItems(data));
    } else {
      setMenuItems([]);
    }
  }, [searchTerm]);

  const handleInputValue = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFindData = () => {
    setItems(menuItems);
    setFindDataOpen(true);
  }

  const { image } = useContext(AuthContext);

  return (
    <>
      <div className="py-7 flex justify-between items-center">
        <div>
          <h2 className="lg:text-[26px] xl:text-[32px] font-semibold text-black"> {formattedPath === '' ? "Cafes" : formattedPath} </h2>
        </div>
        <div className="flex items-center gap-[56px]">
          {/* search filed */}

          <div className="xl:max-w-[400px] lg:max-w-[300px] pl-[16px] pr-[12px] h-[45px] rounded-md bg-[#f0f0f0] flex items-center gap-3">
            <CiSearch size={20} />
            <input
              onChange={(e) => handleInputValue(e)}
              type="text"
              className="bg-transparent border-none outline-none w-full]"
            />
            <button onClick={() => handleFindData()} className="btn bg-[#062A70] px-2 py-1 border rounded-md text-white">Find</button>
          </div>
          <div className="flex items-center gap-[30px]">
            <span>
              <HiOutlineEnvelope
                size={32}
                className="text-black cursor-pointer hover:text-[#1c1c1c]"
              />
            </span>
            <span>
              <BsBell
                size={32}
                className="text-black cursor-pointer hover:text-[#1c1c1c]"
              />
            </span>
            <img
              src={image ? image : profile}
              alt=""
              className="w-[55px] h-[55px] rounded-full cursor-pointer"
            />
          </div>
        </div>

      </div>
      {
        isFindDataOpen == true &&
          items?.data?.length == 0 ?
          <div>
            <button onClick={() => setFindDataOpen(false)} className="btn border border-gray-200 py-1 px-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-white">Remove search item</button>
            <h1 className="text-center font-semibold mt-10 text-2xl text-red-500">Sorry, Nothing found</h1>
          </div>
          :
          isFindDataOpen == true &&
          <div>
            <button onClick={() => setFindDataOpen(false)} className="btn border border-gray-200 py-1 px-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-white">Remove search item</button>
            <div className="grid grid-cols-1 gap-5 mt-10">
              {items?.data?.map((productItem, index) => (
                <div key={index}>
                  <h2 className="text-[#062A70] text-[24px] font-semibold mb-4">
                    Owner: {productItem?.userInfo?.userName ? productItem?.userInfo?.userName : productItem?.userInfo?.userEmail}
                  </h2>
                  <div className="grid grid-cols-3 gap-5">
                    {
                      productItem?.productData?.map((product, index) => <SearchItemCard key={index} item={product} cafeId={productItem?.cafeId} ownerInfo={productItem?.userInfo} />)
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
      }
    </>
  );
};

export default Navbar;
