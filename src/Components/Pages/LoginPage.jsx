import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider, signupWithEmail, loginWithEmail, saveUserToFirestore } from "../Firebase/Firebase";
import google from '../../assets/google.png';
import mobile from '../../assets/mobile.svg';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            await saveUserToFirestore(result.user);
            toast.success('Successfully logged in with Google!');
            navigate('/');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError("");
        
        if (password.length < 6) {
            const msg = "Password must be at least 6 characters long";
            setError(msg);
            toast.error(msg);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const msg = "Please enter a valid email address";
            setError(msg);
            toast.error(msg);
            return;
        }

        try {
            setLoading(true);
            let user;
            if (isSignup) {
                user = await signupWithEmail(email, password);
                toast.success('Account created successfully!');
            } else {
                user = await loginWithEmail(email, password);
                toast.success('Logged in successfully!');
            }
            await saveUserToFirestore(user);
            navigate('/');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Link to="/">
                        <h1 className="text-3xl font-bold text-teal-900">OLX</h1>
                    </Link>
                </div>
                
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isSignup ? "Create an Account" : "Login to OLX"}
                </h2>

                <div 
                    className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-3 mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={handleGoogleLogin}
                >
                    <img className="w-6 mr-3" src={google} alt="Google" />
                    <span className="text-sm font-semibold text-gray-700">Continue with Google</span>
                </div>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Min 6 characters"
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-900 text-white p-3 rounded-md font-bold hover:bg-teal-800 transition-colors mt-2"
                    >
                        {loading ? "Processing..." : (isSignup ? "Sign Up" : "Login")}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <span
                            className="text-teal-700 font-bold cursor-pointer hover:underline"
                            onClick={() => setIsSignup(!isSignup)}
                        >
                            {isSignup ? "Login here" : "Register here"}
                        </span>
                    </p>
                </div>

                <p className="text-[10px] text-center text-gray-500 mt-8">
                    Your personal details are safe with us. By continuing, you agree to our Terms and Conditions and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
