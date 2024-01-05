import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";


const PurchaseHistory = () => {
    const { user } = useContext(AuthContext)

    const { refetch, data: bookings = [] } = useQuery({
        queryKey: ['/booking', user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booking/${user}`)
            const data = await res.json();
            return data;
        }
    })

    const handleStatus = (item) => {
        const data = {
            id: item?._id,
            status: 'receive'
        }
        fetch('http://localhost:5000/booking', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Status successfully update');
                    refetch();
                }
                else {
                    toast.error("Something went wrong");
                }
            })
    }

    return (

        <div className="overflow-x-auto rounded-xl border border-gray-300 mb-10 mt-6">

            <table className="min-w-full table">
                <thead className="bg-[#F8FAFC]">
                    <tr>
                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Product/Meals{" "} </span>
                        </th>

                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Order{" "}</span>
                        </th>

                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base"> Price{" "}  </span>
                        </th>

                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Total Price{" "} </span>
                        </th>

                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Payment Type{" "} </span>
                        </th>

                        {/* <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Status{" "} </span>
                        </th> */}

                        <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                            <span className="text-black font-semibold text-base">  Status{" "} </span>
                        </th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                    {
                        bookings?.data?.length == 0 ?
                            <h1 className="text-center font-semibold mt-10 text-2xl">You have <strong className="underline">0</strong> item</h1>
                            :
                            bookings?.data?.map((item) => (
                                <tr key={item?.id}>
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

                                    <td className="text-sm text-gray-500  whitespace-nowrap">
                                        <h2 className="text-lg font-semibold text-black">
                                            {item?.order}
                                        </h2>
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
                                    <h2 className="text-lg font-semibold text-black capitalize">{item?.payment_type}</h2>
                                    </td>
                                    {/* <td className="text-sm whitespace-nowrap">

                                        {
                                            item?.status == 'booked' || item?.status == 'cash on delivery' ?
                                                <h2 className="text-lg font-semibold text-black">Pending To Ship</h2>
                                                :
                                                item?.status == 'receive' ?
                                                    <h2 className="text-lg font-semibold text-black capitalize">Received</h2>
                                                    :
                                                    <h2 className="text-lg font-semibold text-black capitalize">{item?.status}</h2>
                                        }

                                    </td> */}
                                    <td className="text-sm whitespace-nowrap">
                                        {
                                            item?.status === 'booked' || item?.status == 'cash on delivery' ?
                                                <button disabled className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-blue-500 duration-300 hover:bg-blue-600 font-semibold">
                                                    Pending To Ship
                                                </button>
                                                :
                                                item?.status === 'to ship' ?
                                                    <button onClick={() => handleStatus(item)} className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-sky-500 duration-300 hover:bg-sky-400 font-semibold">
                                                        To Recieve
                                                    </button>
                                                    :
                                                    <button disabled className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-green-500 duration-300 hover:bg-green-400 font-semibold">
                                                        Received
                                                    </button>
                                        }
                                    </td>
                                </tr>
                            ))
                    }

                </tbody>
            </table>
        </div>
    )
};

export default PurchaseHistory;