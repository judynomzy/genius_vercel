import React, { useContext, useState } from 'react';
import loginIcons from '../images/Login_image.webp';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include' ,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate('/')
                fetchUserDetails()
                fetchUserAddToCart()
            } else {
                toast.error(dataApi.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Network error or server is down");
            console.error("Login error:", error);
        }
    };

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto">
                        <img src={loginIcons} alt="login icon" />
                    </div>
                    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Email:</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                            <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline hover:text-red-700">
                                Forgot Password
                            </Link>
                        </div>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
                        >
                            Login
                        </button>
                    </form>
                    <p className="my-5">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="text-red-600 hover:text-red-700 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
