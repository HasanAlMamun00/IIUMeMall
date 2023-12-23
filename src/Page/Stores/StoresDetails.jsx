import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const StoresDetails = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const cafeId = queryParams.get('cafeId');
    const itemId = queryParams.get('itemId');

    const [menuItems, setMenuItems] = useState({});

    useEffect(() => {
        fetch(`https://kind-pear-gorilla-kilt.cyclic.app/cafe/${cafeId}?itemId=${itemId}`)
            .then((res) => res.json())
            .then((data) => setMenuItems(data));
    }, [cafeId, itemId]);

    const [wishList, setWishList] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        if (menuItems?.data?.itemdata?.quantity == quantity) return;
        const increment = quantity + 1;
        setQuantity(increment);
    };
    const decrementQuantity = () => {
        if (quantity == 1) return;
        const decrement = quantity - 1;
        setQuantity(decrement);
    };

    const handleAddWishList = () => {
        const sendData = {
            user_email: user,
            owner_email: menuItems?.data?.userData?.email,
            productName: menuItems?.data?.itemdata?.name,
            productImage: menuItems?.data?.itemdata?.image,
            productPrice: menuItems?.data?.itemdata?.price,
            productType: menuItems?.data?.itemdata?.productType,
            cafeId: cafeId,
            productId: itemId
        }
        fetch('https://kind-pear-gorilla-kilt.cyclic.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Wishlist added successfully');
                    setWishList(!wishList)
                } else if (data?.message == "Already Added") {
                    toast.error("Already Added")
                    setWishList(!wishList)
                } else {
                    toast.error("Something went wrong");
                }
            })
    }

    const handleDeleteWishList = () => {
        setWishList(!wishList)
        const sendData = {
            user_email: user,
            owner_email: menuItems?.data?.userData?.email,
            productName: menuItems?.data?.itemdata?.name,
            productImage: menuItems?.data?.itemdata?.image,
            productPrice: menuItems?.data?.itemdata?.price,
            productType: menuItems?.data?.itemdata?.productType,
            cafeId: cafeId,
            productId: itemId
        }
        fetch('https://kind-pear-gorilla-kilt.cyclic.app/wishlist', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Wishlist deleted successfully');
                    setWishList(!wishList)
                }
                else {
                    toast.error("Something went wrong");
                }
            })
    }

    const handleCartAdd = () => {
        const sendData = {
            user_email: user,
            owner_email: menuItems?.data?.userData?.email,
            productName: menuItems?.data?.itemdata?.name,
            productImage: menuItems?.data?.itemdata?.image,
            productPrice: menuItems?.data?.itemdata?.price,
            productType: menuItems?.data?.itemdata?.productType,
            cafeId: cafeId,
            productId: itemId,
            quantity: menuItems?.data?.itemdata?.quantity,
            order: quantity,
            totalPrice: menuItems?.data?.itemdata?.price * quantity
        }
        fetch('https://kind-pear-gorilla-kilt.cyclic.app/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Product Add Your Cart successfully');
                }
                else {
                    toast.error("Something went wrong");
                }
            })
    }

    const handleBuy = () => {
        const sendData = {
            user_email: user,
            owner_email: menuItems?.data?.userData?.email,
            productName: menuItems?.data?.itemdata?.name,
            productImage: menuItems?.data?.itemdata?.image,
            productPrice: menuItems?.data?.itemdata?.price,
            productType: menuItems?.data?.itemdata?.productType,
            cafeId: cafeId,
            productId: itemId,
            quantity: menuItems?.data?.itemdata?.quantity,
            order: quantity,
            totalPrice: menuItems?.data?.itemdata?.price * quantity
        }
        fetch('https://kind-pear-gorilla-kilt.cyclic.app/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    navigate(`/payment?cartId=${data?.data?._id}`)
                }
                else {
                    toast.error("Something went wrong");
                }
            })
    }


    return (
        <div className="grid grid-cols-9 gap-5">
            <div className="col-span-5 py-5 bg-white shadow-gray-200 shadow-xl">
                <div className="flex justify-center">
                    <img
                        src={menuItems?.data?.itemdata?.image}
                        alt=""
                        className="w-[504px] h-[346px] rounded-md"
                    />
                </div>
                <div className="px-5 flex justify-end mt-4">
                    {wishList ? (
                        <FaHeart
                            onClick={() => handleDeleteWishList()}
                            size={30}
                            className="bg-white cursor-pointer"
                        />

                    ) : (
                        <FaRegHeart
                            onClick={() => handleAddWishList()}
                            size={30}
                            className="text-black cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <div className="col-span-4 py-5 flex justify-center">
                <div>
                    <h2 className="text-[#016170] text-[42px] font-bold capitalize">
                        Product Name: {menuItems?.data?.itemdata?.name}
                    </h2>
                    <p className="text-gray-500 font-bold text-[22px] mt-3">
                        Available: {menuItems?.data?.itemdata?.quantity}
                    </p>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 font-bold text-[22px] mt-3">
                            RM: {menuItems?.data?.itemdata?.price}
                        </p>
                        <p className="text-gray-500 font-bold text-[22px] mt-3">
                            Total: {menuItems?.data?.itemdata?.price * quantity}
                        </p>
                    </div>
                    {/* quantity */}
                    <div className="mt-5 flex items-center gap-8">
                        <h2 className="text-black text-[18px] font-semibold">Quantity</h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => decrementQuantity()}
                                className="w-[45px] h-[55px] bg-[#A1D2FF] border-gray-200 flex justify-center cursor-pointer items-center text-black text-[18px] font-semibold rounded-md"
                            >
                                <FaMinus />
                            </button>
                            <div className="w-[76px] h-[55px] border border-gray-200 rounded-md bg-[#A1D2FF] flex items-center justify-center text-[22px] text-black font-bold ">
                                {quantity}
                            </div>
                            <button
                                onClick={() => incrementQuantity()}
                                className="w-[45px] h-[55px] bg-[#A1D2FF] border-gray-200 flex justify-center cursor-pointer items-center text-black text-[18px] font-semibold rounded-md"
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-12">
                        {/* button */}
                        <button onClick={() => handleCartAdd()} className="flex justify-center px-7 py-3 border-none outline-none rounded-md capitalize text-white bg-blue-700 duration-300 hover:bg-blue-500 font-semibold">
                            Add to cart
                        </button>
                        {
                            menuItems?.data?.itemdata?.quantity <= 0 ?
                                <button disabled className="flex justify-center xl:px-4 lg:px-1 xl:py-[10px] lg:py-1 border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                                    Not available
                                </button>
                                :
                                <button onClick={() => handleBuy()} className="flex justify-center xl:px-4 lg:px-1 xl:py-[10px] lg:py-1 border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                                    Buy Now
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoresDetails;