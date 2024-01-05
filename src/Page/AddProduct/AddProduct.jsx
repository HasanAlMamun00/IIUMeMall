import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const AddProduct = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate()

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = '14f1e107e329b44a04c4481b2e76451e';

    const onSubmit = data => {
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData) {
                    const addProduct = {
                        image: imgData.data.url,
                        productType: data.productType,
                        name: data.name,
                        price: data.price,
                        email: user,
                        quantity: data.quantity
                    }
                    fetch('https://llumemall-backend.vercel.app/cafe', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.statusCode === 200 && data.success === true) {
                                toast.success('Product added successfully');
                                reset();
                                navigate('/my-product')
                            } else {
                                toast.error("Something went wrong");
                            }
                        })
                }
            })
    };


    return (
        <div className='flex w-80 mx-auto mt-8 pb-6'>

            <div>
                <h1 className='text-gray-500 text-3xl font-bold mb-10'>Please Add A Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text text-bold text-2xl text-gray-500">Product Name<span className="text-red-500">*</span></span>
                        </label>
                        <input {...register("name", { required: true })} type="text" className="border rounded-lg h-10 w-full max-w" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text text-bold text-2xl text-gray-500">Product Price<span className="text-red-500">*</span></span>
                        </label>
                        <input {...register("price", { required: true })} type="number" className="border rounded-lg h-10 w-full max-w" />
                        {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text text-bold text-2xl text-gray-500">Product Quantity<span className="text-red-500">*</span></span>
                        </label>
                        <input
                            {...register("quantity", { required: true, min: 1 })} // Add the min attribute for minimum value
                            type="number"
                            className="border rounded-lg h-10 w-full max-w"
                        />
                        {errors.quantity && <p className='text-red-600'>{errors.quantity?.message}</p>}
                    </div>


                    <div className="mb-4">
                        <label className="label"><span className="label-text text-bold text-2xl text-gray-500 mb-4">Which Type Product Add<span className="text-red-500">*</span></span></label>
                        <select {...register('productType')} className="select border rounded-lg h-10 w-full text-gray-500">
                            <option>cafe</option>
                            <option>store</option>
                        </select>
                        {errors.productType && <p className='text-red-600'>{errors.productType?.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text text-bold text-2xl text-gray-500">Product Image<span className="text-red-500">*</span></span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input file-border rounded-lg h-10 file-input-success w-full" />
                        {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                    </div>

                    <input className='text-2xl btn btn-accent w-full mt-5 text-white bg-blue-500 border rounded-lg cursor-pointer' value='Add Product' type="submit" />
                </form>
            </div>

        </div>
    );
};

export default AddProduct;