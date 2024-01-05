/* eslint-disable react/prop-types */
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import app from "../Firebase/Firebase.config";

const auth = getAuth(app)

const ForgetPassword = ({ setForgetPassword }) => {

    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert("Please check your email for reset your password.");
            setForgetPassword(false);
        })
        .catch(() =>{
            alert("Invalid credentials");
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">

                <div className="flex items-center justify-between">
                    <h3 className="text-[26px] font-bold text-[#0A0A0A] capitalize" id="modal-title"> Email </h3>
                    <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setForgetPassword(false)} size={25}></RxCross1></button>
                </div>

                <hr className="mt-2 mb-4" />

                    <div className="mb-5">
                        <h6 className="text-base font-semibold text-black mb-3">
                            Email Address
                        </h6>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email "
                            className="w-full py-2 px-4 outline-none border-none rounded-md font-semibold"
                        />
                    </div>


                    <div className="flex justify-end mt-6 gap-4">
                        <button onClick={() => handleSubmit()} className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#1f6b6b] rounded-xl hover:bg-[#1f6b6b]">Submit</button>
                    </div>

            </div>
        </div>
    );
};

export default ForgetPassword;