import { useState } from "react";
import { useEffect } from "react";
import ItemCardCafe from "../../shared/ItemCard/ItemCardCafe";

const Cafes = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("https://kind-pear-gorilla-kilt.cyclic.app/cafe?productType=cafe")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);


  return (
      <div className="mt-7 mb-8">
        <div className="grid grid-cols-1 gap-5 mt-10">
          {menuItems?.data?.map((productItem, index) => (
            <div key={index}>
              <h2 className="text-[#062A70] text-[24px] font-semibold mb-4">
                Cafe: {productItem?.userInfo?.userName ? productItem?.userInfo?.userName : productItem?.userInfo?.userEmail}
              </h2>
              <div className="grid grid-cols-3 gap-5">
                {
                  productItem?.productData?.map((product, index) => <ItemCardCafe key={index} item={product} cafeId={productItem?.cafeId} ownerInfo={productItem?.userInfo} />)
                }
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Cafes;
