/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartDetails = ({ item, refetch }) => {

    const [quantity, setQuantity] = useState({});

    useEffect(() => {
        fetch(`https://kind-pear-gorilla-kilt.cyclic.app/cafe/${item?.cafeId}?itemId=${item?.productId}`)
            .then((res) => res.json())
            .then((data) => setQuantity(data));
    }, [item?.cafeId, item?.productId]);

    const incrementQuantity = (data) => {
        if (data?.order >= quantity?.data?.itemdata?.quantity) {
            return;
        }
        const sendData = {
            _id: data?._id,
            order: (data?.order + 1),
            totalPrice: ((data?.order + 1) * data?.productPrice)
        }
        fetch('https://kind-pear-gorilla-kilt.cyclic.app/cart', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Quantity Update successfully');
                    refetch()
                } else {
                    toast.error("Something went wrong");
                }
            })
    };
    const decrementQuantity = (data) => {
        if (data?.order <= 1) {
            return;
        }
        const sendData = {
            _id: data?._id,
            order: (data?.order - 1),
            totalPrice: ((data?.order - 1) * data?.productPrice)
        }
        fetch('https://kind-pear-gorilla-kilt.cyclic.app/cart', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Quantity Update successfully');
                    refetch()
                } else {
                    toast.error("Something went wrong");
                }
            })
    };

    const removeItem = (id) => {
        const sendData = {
            id: id,
        }
        fetch('https://kind-pear-gorilla-kilt.cyclic.app/cart', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Item delete successfully');
                    refetch()
                } else {
                    toast.error("Something went wrong");
                }
            })
    };


    return (
        <tr>
            <td className="text-sm font-medium text-gray-700">
                <div className="inline-flex items-center gap-x-3">
                    <div className="flex flex-col items-center gap-y-2">
                        <img
                            className="object-cover w-20 h-20 rounded-full"
                            src={item?.productImage}
                            alt=""
                        />
                        <div>
                            <h2 className="font-medium text-gray-800  ">
                                {item?.productName}
                            </h2>
                        </div>
                    </div>
                </div>
            </td>

            <td className="text-sm whitespace-nowrap">
                <h2 className="text-lg font-semibold text-black">
                    {quantity?.data?.itemdata?.quantity}
                </h2>
            </td>

            <td className="text-sm text-gray-500  whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => decrementQuantity(item)}
                        className="w-[45px] h-[45px] bg-[#A1D2FF] border-gray-200 flex justify-center cursor-pointer items-center text-black  font-medium rounded-md"
                    >
                        <FaMinus size={14} />
                    </button>
                    <div className="w-[56px] h-[45px] border border-gray-200 rounded-md bg-[#A1D2FF] flex items-center justify-center text-[18px] text-black font-bold ">
                        {item?.order}
                    </div>
                    <button
                        onClick={() => incrementQuantity(item)}
                        className="w-[45px] h-[45px] bg-[#A1D2FF] border-gray-200 flex justify-center cursor-pointer items-center text-black  font-medium rounded-md"
                    >
                        <FaPlus size={14} />
                    </button>
                </div>
            </td>
            <td className="text-sm whitespace-nowrap">
                <h2 className="text-lg font-semibold text-black">
                    RM: {item?.productPrice}
                </h2>
            </td>
            <td className="text-sm whitespace-nowrap">
                <h2 className="text-lg font-semibold text-black">
                    RM: {item?.totalPrice}
                </h2>
            </td>
            <td className="text-sm whitespace-nowrap">
                <button onClick={() => removeItem(item?._id)} className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-red-500 duration-300 hover:bg-red-300 font-semibold">
                    Remove
                </button>
            </td>
            <td className="text-sm whitespace-nowrap">
                {
                    item?.order > quantity?.data?.itemdata?.quantity ?
                        <button disabled className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                            Not enough quantity
                        </button>
                        :
                        <Link to={`/payment?cartId=${item?._id}`}>
                            <button className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-[#016170] duration-300 hover:bg-[#0f7383] font-semibold">
                                Buy Now
                            </button>
                        </Link>
                }
            </td>
        </tr>
    );
};

export default CartDetails;