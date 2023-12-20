import { useState } from "react";
import { useEffect } from "react";
import ItemcardStore from "../../shared/ItemCard/ItemcardStore";

const Stores = () => {

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/cafe?productType=store")
            .then((res) => res.json())
            .then((data) => setMenuItems(data));
    }, []);

    return (
        <div className="mt-7 mb-8">
            {/* <CafeDetails /> */}

            <div className="grid grid-cols-1 gap-5 mt-10">
                {menuItems?.data?.map((productItem, index) => (
                    <div key={index}>
                        <h2 className="text-[#062A70] text-[24px] font-semibold mb-4">
                            Store: {productItem?.userInfo?.userName ? productItem?.userInfo?.userName : productItem?.userInfo?.userEmail}
                        </h2>
                        <div className="grid grid-cols-3 gap-5">
                            {
                                productItem?.productData?.map((product, index) => <ItemcardStore key={index} item={product} cafeId={productItem?.cafeId} ownerInfo={productItem?.userInfo} />)
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stores;