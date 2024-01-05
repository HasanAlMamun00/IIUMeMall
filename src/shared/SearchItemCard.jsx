/* eslint-disable react/prop-types */

import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Page/Context/AuthProvider";

const SearchItemCard = ({ item, cafeId, ownerInfo }) => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleBuy = (item) => {
        const sendData = {
            user_email: user,
            owner_email: ownerInfo?.userEmail,
            productName: item?.name,
            productImage: item?.image,
            productPrice: item?.price,
            productType: item?.productType,
            cafeId: cafeId,
            productId: item?._id,
            quantity: item?.quantity,
            order: 1,
            totalPrice: item?.price
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
        <div className=" pt-6 pb-5 shadow-xl rounded-md bg-white">
            <div className="flex justify-center">
                <img src={item?.image} alt="" className="rounded-md" />
            </div>
            <div className="px-[27px]">
                <h2 className="text-[20px] text-black font-semibold mt-3 text-center">
                    {item?.name}
                </h2>
                <div className="flex items-center justify-between">
                    <p className="text-[#009393] text-[18px] font-semibold text-center">
                        RM: {item?.price}
                    </p>
                    <p className="text-[#009393] text-[18px] font-semibold text-center">
                        Quantity: {item?.quantity}
                    </p>
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <Link to={`/cafeDetails?cafeId=${cafeId}&itemId=${item?._id}`}>
                        <button className="flex justify-center xl:px-4 lg:px-1 xl:py-[10px] lg:py-1 border-none outline-none rounded-md capitalize text-white bg-blue-500 duration-300 hover:bg-[#0f7383] font-semibold">
                            See Details
                        </button>
                    </Link>
                    {
                        item?.quantity <= 0 ?
                            <button disabled className="flex justify-center xl:px-4 lg:px-1 xl:py-[10px] lg:py-1 border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                                Not available
                            </button>
                            :
                            <button onClick={() => handleBuy(item)} className="flex justify-center xl:px-4 lg:px-1 xl:py-[10px] lg:py-1 border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                                Buy Now
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchItemCard;