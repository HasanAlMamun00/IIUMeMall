import { useContext, useState } from "react";
import loginLogo from "../../assets/login-logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";
import GoogleLogin from "../../shared/GoogleLogin";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [checkBox, setCheckBox] = useState(false);

  const { createUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkBox == false) {
      toast.error("Please enable checkbox");
    } else {
      createUser(email, password)
        .then(result => {
          if (result == 'Already have an account') {
            toast.error('Already have an account')
          } else if (result == 'Something went wrong') {
            toast.error('Something went wrong')
          }else{
            saveUser(result.email, role);
          }
        })
    }
  };

  const saveUser = (email) => {
    const user = { email, role };
    fetch(
      "https://llumemall-backend.vercel.app/userReg",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200 && data.success === true) {
          toast.success("Successfull");
          navigate("/");
          window.location.reload(true)
        } else {
          if (data.message == "Previously Added") {
            navigate("/");
          }
        }
      });
  };

  return (
    <div>
      <section className="login-bg">
        <div className="container px-6 py-24 mx-auto lg:py-28 xl:py-32">
          <div className="lg:flex gap-4">
            <div className="lg:w-1/2">
              <div className="text-center">
                <div className="flex justify-center">
                  <img src={loginLogo} alt="" />
                </div>
                <h2 className="lg:text-[38px] xl:text-[54px] font-normal text-black ">
                  Welcome to the
                </h2>
                <h1 className="xl:text-[54px] lg:text-[38px] text-black font-bold">
                  IIUMeMall
                </h1>
                <p className="text-xl font-normal text-black">
                  {`This project aims to develop an e-commerce application specifically
            designed for students and IIUM communities to provide them with easy
            and convenient access to goods and meals. IIUMeMall will allow
            students to order products and meals online and have them delivered
            to their mahallah or other designated location.`}
                </p>
              </div>
            </div>

            <div className="mt-8 lg:w-1/2 lg:mt-0 px-10 ">
              <div className="form-login pt-[31px] pb-[102px] px-[70px]">
                <div className="flex justify-center">
                  <h2 className="text-[30px] text-black font-bold">Sign Up</h2>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mt-[35px]">
                    <div className="mb-5">
                      <h6 className="text-base font-semibold text-black mb-3">
                        Email Address
                      </h6>
                      <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email "
                        className="w-full py-2 px-4 outline-none border-none rounded-md font-semibold"
                      />
                    </div>
                    <div className="mb-5">
                      <h6 className="text-base font-semibold text-black mb-3">
                        Password
                      </h6>
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password "
                        className="w-full py-2 px-4 outline-none border-none rounded-md font-semibold"
                      />
                    </div>
                    <div className="mb-5">
                      <h6 className="text-base font-semibold text-black mb-3">
                        Continue As
                      </h6>
                      <select
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full py-2 px-4 outline-none border-none rounded-md font-semibold text-gray-400"
                      >
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                      </select>
                    </div>
                    <div>
                      <label>
                        <input
                          onClick={() => setCheckBox(!checkBox)}
                          type="checkbox"
                          className="accent-[#016170]"
                        />{" "}
                        Remember Me
                      </label>
                    </div>
                    <div className="flex justify-center mt-6">
                      {user == null || user == undefined ? (
                        <button className="bg-[#009393] hover:bg-[#1f6b6b] text-white w-[227px] py-[12px] rounded-md duration-300 flex justify-center">
                          {" "}
                          Sign Up
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-[#009393] hover:bg-[#1f6b6b] text-white w-[227px] py-[12px] rounded-md duration-300 flex justify-center"
                        >
                          Logged in
                        </button>
                      )}
                    </div>

                    {/* google button */}
                    <GoogleLogin />

                    <p className="text-center mt-4">
                      Already have an account{" "}
                      <Link to="/login" className="underline text-blue-600">
                        Please Log In
                      </Link>{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
