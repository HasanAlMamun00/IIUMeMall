import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_51OOhqABezfSpiXxQBmGROBNlGmx2QQ9A2c1dgN28WGXasP5RTuvlMiFESNqv9cV8nWOSzVi6zcmue1jQg2tfc7sl00BwgfIaPk');

const Payment = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const cartId = queryParams.get('cartId');

    const [menuItems, setMenuItems] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://llumemall-backend.vercel.app/cart/single/${cartId}`)
            .then((res) => res.json())
            .then((data) => setMenuItems(data));
    }, [cartId]);

    const handleDelivery = (menuItems) =>{
        const payment = {
            cafeId: menuItems?.cafeId,
            order: menuItems?.order,
            user_email: menuItems?.user_email,
            productId: menuItems?.productId,
            productImage: menuItems?.productImage,
            owner_email: menuItems?.owner_email,
            productName: menuItems?.productName,
            productPrice: menuItems?.productPrice,
            productType: menuItems?.productType,
            cartId: menuItems?._id,
            totalPrice: menuItems?.totalPrice,
            status: 'cash on delivery',
            payment_type: 'Cash on Delivery'
        }
        fetch('https://llumemall-backend.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Buying successfully');
                    navigate('/purchase-history')
                } else {
                    toast.error("Something went wrong");
                }
            })
    }

    return (
            <div className='flex items-center justify-around'>
                <div>
                    <h3 className="text-2xl">Payment for: <strong className='underline'>{menuItems?.data?.productName}</strong> </h3>
                    <p className="text-xl mt-4">Per item RM: <strong className='underline'>{menuItems?.data?.productPrice}</strong> </p>
                    <p className="text-xl mt-4">Please pay RM: <strong className='underline'>{menuItems?.data?.totalPrice}</strong> for <strong className='underline'>{menuItems?.data?.order}</strong> item </p>
                        <div className='w-96 my-8'>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    menuItems={menuItems?.data}
                                />
                            </Elements>
                        </div>
                        <h1>OR</h1>
                        <button onClick={() => handleDelivery(menuItems?.data)} className='btn py-1 px-2 border border-gray-200 rounded-lg text-white bg-blue-500 hover:bg-blue-400 mt-4'>Cash On Delivery</button>
                </div>

                <div className="px-3 py-3 bg-white shadow-gray-200 shadow-xl">
                    <div className="flex justify-center">
                        <img
                            src={menuItems?.data?.productImage}
                            alt=""
                            className="w-[400px] h-[346px] rounded-md"
                        />
                    </div>
                </div>
            </div>
    );
};

export default Payment;