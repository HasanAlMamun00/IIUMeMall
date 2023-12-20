/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";

const UserDetails = ({ userData, setUserDetailsPopUp }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">

                <div className="flex items-center justify-between">
                    <h3 className="text-[26px] font-bold text-[#0A0A0A] capitalize" id="modal-title"> User Details </h3>
                    <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setUserDetailsPopUp(false)} size={25}></RxCross1></button>
                </div>

                <hr className="my-4" />

                <div className="flex items-center justify-between">
                    <div>
                        <p>Name: <strong>{userData?.name}</strong></p>
                        <p>Email: <strong>{userData?.email}</strong></p>
                        <p>Role: <strong>{userData?.role}</strong></p>
                        <p>Phone Number: <strong>{userData?.phone}</strong></p>
                        <p>Date Of Birth: <strong>{userData?.date_birth}</strong></p>
                        <p>Address: <strong>{userData?.address}</strong></p>
                    </div>
                    <img src={userData?.image} alt="profile picture" />
                </div>

            </div>
        </div>
    );
};

export default UserDetails;