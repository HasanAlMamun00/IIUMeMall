import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EditProduct from "./EditProduct";

const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditdata] = useState(false);

    const { refetch, data: products = [] } = useQuery({
        queryKey: ['/cafe/myProduct', user],
        queryFn: async () => {
            const res = await fetch(`https://llumemall-backend.vercel.app/cafe/myProduct/${user}`)
            const data = await res.json();
            return data;
        }
    })

    const cafeId = products?.data?._id;

    const handledelete = (id) => {
        const data = {
            cafeId,
            productId: id
        }
        fetch('https://llumemall-backend.vercel.app/cafe', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Product delete successfully');
                    refetch();
                } else {
                    toast.error("Something went wrong");
                }
            })
    }

    const handleEdit = (item) => {
        setIsEdit(!isEdit);
        setEditdata(item)
    }

    return (
        <>
            <div className="mb-10">
                <h1 className='text-gray-500 text-3xl font-bold text-center mt-5 mb-8'>You Added Total <strong className="underline">{products?.data?.item?.length ? products?.data?.item?.length : 0}</strong> Items</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {
                        products?.data?.item?.map((item, index) => <div key={index} className="card bg-white shadow-xl mx-auto p-5">
                            < label><figure><img src={item?.image} width='240px' height='240px' alt="Shoes" /></figure></label >

                            <div className="">
                                <h2 className="text-xl font-bold">Name: {item?.name}</h2>
                                <div className="flex items-center justify-between">
                                    <p className='font-bold'>Price: RM {item?.price}</p>
                                    <p className='font-bold'>Quantity: {item?.quantity}</p>
                                </div>
                                <p className='font-bold'>Product Type: {item?.productType}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <button onClick={() => handleEdit(item)} className="btn bg-blue-400 px-4 rounded-lg text-white py-1">Edit</button>
                                    <button onClick={() => handledelete(item?._id)} className="btn bg-blue-400 px-4 rounded-lg text-white py-1">Delete</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            {
                isEdit == true && <EditProduct data={editData} setIsEdit={setIsEdit} cafeId={cafeId} refetch={refetch} />
            }
        </>
    );
};

export default MyProduct;