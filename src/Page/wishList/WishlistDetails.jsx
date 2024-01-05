/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";


const WishlistDetails = ({ item }) => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [menuItems, setMenuItems] = useState({});

    useEffect(() => {
        fetch(`https://llumemall-backend.vercel.app/cafe/${item?.cafeId}?itemId=${item?.productId}`)
            .then((res) => res.json())
            .then((data) => setMenuItems(data));
    }, [item?.cafeId, item?.productId]);

    const handleDeleteWishList = (item) => {
        const sendData = {
            user_email: item.user_email,
            owner_email: item.owner_email,
            productName: item.productName,
            productImage: item.productImage,
            productPrice: item.productPrice,
            productType: item.productType,
            cafeId: item.cafeId,
            productId: item.productId
        }
        fetch('https://llumemall-backend.vercel.app/wishlist', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Wishlist deleted successfully');
                }
                else {
                    toast.error("Something went wrong");
                }
            })
    }


    const handleCartAdd = (item) => {
        const sendData = {
            user_email: user,
            owner_email: item?.owner_email,
            productName: item?.productName,
            productImage: item?.productImage,
            productPrice: item?.productPrice,
            productType: item?.productType,
            cafeId: item?.cafeId,
            productId: item?.productId,
            order: 1,
            totalPrice: item?.productPrice
        }
        fetch('https://llumemall-backend.vercel.app/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Product Add Your Cart successfully');
                }
                else {
                    toast.error("Something went wrong");
                }
            })
    }

    const handleBuy = (item) => {
        const sendData = {
            user_email: user,
            owner_email: item?.owner_email,
            productName: item?.productName,
            productImage: item?.productImage,
            productPrice: item?.productPrice,
            productType: item?.productType,
            cafeId: item?.cafeId,
            productId: item?.productId,
            order: 1,
            totalPrice: item?.productPrice
        }
        fetch('https://llumemall-backend.vercel.app/cart', {
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
        <div className="py-6 px-3 rounded-md bg-white shadow-xl">
            <div className="flex justify-center relative">
                <img src={item?.productImage} alt="" />
                <FaHeart onClick={() => handleDeleteWishList(item)}
                    size={30}
                    className="text-red-600 cursor-pointer absolute top-4 left-4 "
                />
            </div>
            <h2 className="text-[#016170] text-center text-[20px] font-bold mt-4 capitalize">
                {item?.productName}
            </h2>
            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-center fot-normal text-[18px] mt-3">
                    RM: {item?.productPrice}
                </p>
                <p className="text-gray-500 text-center fot-normal text-[18px] mt-3">
                    Available: {menuItems?.data?.itemdata?.quantity}
                </p>
            </div>
            <div className="flex items-center justify-between mt-6">
                <button onClick={() => handleCartAdd(item)} className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-sky-500 duration-300 hover:bg-sky-400 font-semibold">
                    Add to cart
                </button>

                {
                    menuItems?.data?.itemdata?.quantity <= 0 ?
                        <button disabled className="flex justify-center xl:px-4 lg:px-1 xl:py-[10px] lg:py-1 border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                            Not available
                        </button>
                        :
                        <button onClick={() => handleBuy(item)} className="flex justify-center xl:px-4 lg:px-1 xl:py-[10px] lg:py-1 border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                            Pay Now
                        </button>
                }
            </div>
        </div>
    );
};

export default WishlistDetails;