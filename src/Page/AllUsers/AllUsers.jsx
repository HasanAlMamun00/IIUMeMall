
import { IoIosInformationCircleOutline } from "react-icons/io";
// import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserDetails from "./UserDetails";
import toast from "react-hot-toast";

const AllUsers = () => {

  const [userDetailsPopUp, setUserDetailsPopUp] = useState(false);
  const [userData, setUserData] = useState({})

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['/userReg'],
    queryFn: async () => {
      const res = await fetch(`https://llumemall-backend.vercel.app/userReg`)
      const data = await res.json();
      return data;
    }
  })

  const handleDetails = (data) => {
    setUserData(data);
    setUserDetailsPopUp(!userDetailsPopUp);
  }

  // const handleDelete = (id) =>{
  // }

  const handleAdmin = (id) => {
    const data = {
      id: id
    }
    fetch('https://llumemall-backend.vercel.app/userReg', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.statusCode === 200 && data.success === true) {
          toast.success('Make Admin successfully');
          refetch();
        }
        else {
          toast.error("Something went wrong");
        }
      })
  }

  return (
    <>
      {/* Table Start */}
      <div className="overflow-x-auto rounded-xl border border-gray-300 mb-10 mt-6">

        <table className="min-w-full table">
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th className=" text-gray-500">
                <h2 className="font-semibold text-[16px]"> User Email</h2>
              </th>

              <th className=" text-gray-500">
                <h2 className="font-semibold text-[16px]"> User Name</h2>
              </th>

              <th className=" text-gray-500">
                <h2 className="font-semibold text-[16px]"> User Role</h2>
              </th>

              <th className=" text-gray-500">
                <h2 className="font-semibold text-[16px]">Make Admin</h2>
              </th>

              <th className=" text-gray-500">
                <h2 className="font-semibold text-[16px]"> User Action</h2>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

            {
              users?.data?.map(user => <tr key={user?._id}>
                <td>
                  <h2 className="font-semibold">{user?.email}</h2>
                </td>
                <td>
                  <h2 className="font-semibold">{user?.name}</h2>
                </td>
                <td>
                  <h2 className="font-semibold">{user?.role}</h2>
                </td>
                <td>
                  {
                    user?.role == 'admin' ?
                      <button className="btn border rounded-lg px-2 py-1 bg-green-500 text-white hover:bg-green-400">Already Admin</button>
                      :
                      <button onClick={() => handleAdmin(user?._id)} className="btn border rounded-lg px-2 py-1 bg-sky-500 text-white hover:bg-sky-400">Make Admin</button>
                  }
                </td>
                <td>
                  <button className="p-2 bg-white border border-transparent rounded-md text-gray-400 flex items-center gap-4">
                    <IoIosInformationCircleOutline onClick={() => handleDetails(user)} size={30} />
                    {/* <MdDeleteOutline onClick={() => handleDelete(user?._id)} size={25} /> */}
                  </button>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
      {
        userDetailsPopUp == true && <UserDetails userData={userData} setUserDetailsPopUp={setUserDetailsPopUp} />
      }
    </>
  );
};

export default AllUsers;
