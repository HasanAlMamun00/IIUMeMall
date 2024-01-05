import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import CartDetails from "./CartDetails";

const Cart = () => {

  const { user } = useContext(AuthContext)

  const { refetch, data: carts = [] } = useQuery({
    queryKey: ['/cart', user],
    queryFn: async () => {
      const res = await fetch(`https://llumemall-backend.vercel.app/cart/${user}`)
      const data = await res.json();
      return data;
    }
  })


  return (

    <div className="overflow-x-auto rounded-xl border border-gray-300 mb-10 mt-6">

      <table className="min-w-full table">
        <thead className="bg-[#F8FAFC]">
          <tr>
            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
              <span className="text-black font-semibold text-base">  Product/Meals{" "} </span>
            </th>

            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
              <span className="text-black font-semibold text-base">  Available{" "} </span>
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
              <span className="text-black font-semibold text-base">  Remove{" "} </span>
            </th>

            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
              <span className="text-black font-semibold text-base"> Buy Now{" "} </span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

          {
            carts?.data?.length == 0 ?
              <h1 className="text-center font-semibold mt-10 text-2xl">You have <strong className="underline">0</strong> item</h1>
              :
              carts?.data?.map((item) => (
                <CartDetails key={item?.id} item={item} refetch={refetch} />
              ))
          }

        </tbody>
      </table>

      {/* order information */}
      {/* <div className="col-span-4">
    //     <div className=" pt-10 pb-6 px-4">
    //       <h2 className="text-2xl font-semibold text-black text-center">
    //         Order Information
    //       </h2>

    //       <div className="w-full mt-6">
    //         <div className="mb-4">
    //           <input
    //             type="text"
    //             defaultValue={"Abdul Sultan"}
    //             className="w-full py-3 px-4 border border-[#ebebeb] bg-[#eaeaea] outline-none  text-lg font-semibold text-[#1c1c1c] rounded-md"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <input
    //             type="email"
    //             defaultValue={"AbdulSultan@gmail.com"}
    //             className="w-full py-3 px-4 border border-[#ebebeb] bg-[#eaeaea] outline-none  text-lg font-semibold text-[#1c1c1c] rounded-md"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <input
    //             type="text"
    //             defaultValue={"Mahallah Ali, IIUM"}
    //             className="w-full py-3 px-4 border border-[#ebebeb] bg-[#eaeaea] outline-none  text-lg font-semibold text-[#1c1c1c] rounded-md"
    //           />
    //         </div>
    //         <div className="mb-4 flex gap-4">
    //           <input
    //             type="text"
    //             defaultValue={"53100"}
    //             className="w-full py-3 px-4 border border-[#ebebeb] bg-[#eaeaea] outline-none  text-lg font-semibold text-[#1c1c1c] rounded-md"
    //           />
    //           <input
    //             type="text"
    //             defaultValue={"Gombak"}
    //             className="w-full py-3 px-4 border border-[#ebebeb] bg-[#eaeaea] outline-none  text-lg font-semibold text-[#1c1c1c] rounded-md"
    //           />
    //         </div>

    //         <div className="mb-4">
    //           <input
    //             type="text"
    //             defaultValue={"Selangor, Malaysia"}
    //             className="w-full py-3 px-4 border border-[#ebebeb] bg-[#eaeaea] outline-none  text-lg font-semibold text-[#1c1c1c] rounded-md"
    //           />
    //         </div>
    //         <div className="flex justify-center">
    //           <button className="bg-[#C6CEFF] rounded-[20px] text-black font-semibold px-[35px] py-4">
    //             Continue With Payment
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="text-center">
    //       <h2 className="text-[20px] font-semibold text-black">
    //         Total Checkout:{" "}
    //       </h2>
    //       <h1 className="text-[26px] font-semibold text-black">RM16.50</h1>
    //     </div>
    //   </div> */}

    </div>
  );
};

export default Cart;
