import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {

  const { user } = useContext(AuthContext)

  const { register, reset, handleSubmit } = useForm();

  const { refetch, data: userInfo = [] } = useQuery({
    queryKey: ['userReg', user],
    queryFn: async () => {
      const res = await fetch(`https://llumemall-backend.vercel.app/userReg/${user}`)
      const data = await res.json();
      return data;
    }
  })

  const imageHostKey = '14f1e107e329b44a04c4481b2e76451e';

  // post a Admin details
  const handleDataPost = (data) => {
    if (data?.image?.length > 0) {
      const image = data.image[0]
      const formData = new FormData()
      formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(imgData => {
          if (imgData) {
            const sendData = {
              image: imgData.data.url,
              name: data.name ? data.name : userInfo?.data?.name,
              email: user,
              phone: data.phone ? data.phone : userInfo?.data?.phone,
              address: data.address ? data.address : userInfo?.data?.address,
              date_birth: data.date_birth ? data.date_birth : userInfo?.data?.date_birth
            }
            fetch('https://llumemall-backend.vercel.app/userReg', {
              method: 'PATCH',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(sendData)
            })
              .then(res => res.json())
              .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                  toast.success('information Update successfully');
                  reset();
                  refetch()
                } else {
                  toast.error("Something went wrong");
                }
              })
          }
        })
    }
    else {
      const sendData = {
        image: userInfo.data?.image,
        name: data.name ? data.name : userInfo?.data?.name,
        email: user,
        phone: data.phone ? data.phone : userInfo?.data?.phone,
        address: data.address ? data.address : userInfo?.data?.address,
        date_birth: data.date_birth ? data.date_birth : userInfo?.data?.date_birth
      }
      fetch('https://llumemall-backend.vercel.app/userReg', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.statusCode === 200 && data.success === true) {
            toast.success('information Update successfully');
            reset();
            refetch();
          } else {
            toast.error("Something went wrong");
          }
        })
    }
  }

  const handleCancel = () => {
    reset()
  }


  return (
    <div className="pb-20">
      <h1 className="text-center underline text-gray-700 mb-10 text-3xl font-semibold">Edit Your profile</h1>
      <div className="flex items-center justify-center">
        <div className="bg-white border border-[#eaeaea] px-7 py-6">

          <form onSubmit={handleSubmit(handleDataPost)}>

            <div className="flex items-center justify-center">
              <img
                src={userInfo?.data?.image}
                alt=""
                className="w-[70px] h-[70px] rounded-full object-cover"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="image" className="text-[20px] text-gray-900 font-semibold " >  Select Image </label>
              <input type="file" {...register("image")} id='image' className="w-full bg-[#C6CEFF] py-3 px-4 border border-[#e4e2e2]  outline-none  text-lg font-normal text-[#1c1c1c] rounded-md mt-3" />
            </div>

            <div className="mb-5">
              <label htmlFor="username" className="text-[20px] text-gray-900 font-semibold " >  Username </label>
              <input type="text" defaultValue={userInfo?.data?.name} {...register("name")} id='username' className="w-full py-3 px-4 border border-[#e4e2e2]  outline-none  text-lg font-normal text-[#1c1c1c] rounded-md mt-3" />
            </div>

            <div className="mb-5">
              <label htmlFor="address" className="text-[20px] text-gray-900 font-semibold " > Address </label>
              <input defaultValue={userInfo?.data?.address}  {...register("address")} type="test" className="w-full py-3 px-4 border border-[#e4e2e2]  outline-none  text-lg font-normal text-[#1c1c1c] rounded-md mt-3" />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="text-[20px] text-gray-900 font-semibold "
              >
                Phone Number
              </label>
              <input  {...register("phone")}
                type="text"
                defaultValue={userInfo?.data?.phone}
                className="w-full py-3 px-4 border border-[#e4e2e2]  outline-none  text-lg font-normal text-[#1c1c1c] rounded-md mt-3"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="dob"
                className="text-[20px] text-gray-900 font-semibold "
              >
                DOB
              </label>
              <input
                type="date"
                {...register("date_birth")}
                className="w-full py-3 px-4 border border-[#e4e2e2]  outline-none  text-lg font-normal text-[#1c1c1c] rounded-md mt-3"
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <button className="px-6 py-3 bg-[#C6CEFF] hover:bg-[#a0a6cf] duration-300 rounded-[8px] cursor-pointer font-semibold" type="Submit">
                Save
              </button>
              <button onClick={() => handleCancel()} className="px-6 py-3 bg-red-600 hover:bg-red-700 duration-300 text-white rounded-[8px] cursor-pointer font-semibold" type="button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
