/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";


const EditProduct = ({ data, setIsEdit, cafeId, refetch }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const productId = data?._id

    // post a User details
    const handleDataPost = (data) => {
        const postdata = {
            name: data?.name,
            price: data?.price,
            cafeId: cafeId,
            productId: productId,
            quantity: data?.quantity
        }
        fetch('https://llumemall-backend.vercel.app/cafe', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postdata)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Product update successfully');
                    refetch();
                    setIsEdit(false)
                } else {
                    toast.error("Something went wrong");
                }
            })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">

                <div className="flex items-center justify-between">
                    <h3 className="text-[26px] font-bold text-[#0A0A0A] capitalize" id="modal-title"> Product Update </h3>
                    <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setIsEdit(false)} size={25}></RxCross1></button>
                </div>

                <h4 className="font-semibold text-[20px] mt-2">Product Information</h4>
                <hr className="mt-2 mb-4" />

                <form onSubmit={handleSubmit(handleDataPost)}>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="name">Product Name<span className="text-red-500">*</span></label>
                        <input placeholder="Product Name" defaultValue={data?.name} {...register("name", { required: 'Product Name is required' })} id="name" type="text" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="price">Product price<span className="text-red-500">*</span></label>
                        <input placeholder="Product price" defaultValue={data?.price} {...register("price", { required: 'Product price is required' })} id="price" type="number" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                        {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="quantity">Product quantity<span className="text-red-500">*</span></label>
                        <input placeholder="Product quantity" defaultValue={data?.quantity} {...register("quantity", { required: 'Product quantity is required' })} id="quantity" type="number" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                        {errors.quantity && <p className='text-red-600'>{errors.quantity?.message}</p>}
                    </div>

                    <div className="flex justify-end mt-6 gap-4">
                        <button onClick={() => setIsEdit(false)} className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border">Cancel</button>
                        <button type="Submit" className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]">Update Now</button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default EditProduct;