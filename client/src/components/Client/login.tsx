import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "../../common/hearder";
import toast, { Toaster } from "react-hot-toast";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const nav = useNavigate()

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/client/login", {
                email,
                password,
            });

            const { reult } = response.data;
            const { detail: user, accessToken: token } = reult;

            console.log("Token is", token);

            if (user.email === "admin@example.com") {
                localStorage.setItem("role", "admin");


            } else {
                localStorage.setItem("role", "user");


            }
            localStorage.setItem("authToken", token);



            console.log("Login successful:", user);
            console.log("UseR Id ", user._id)
            console.log("Use name ", user.name)

            localStorage.setItem("name", user.name)
            localStorage.setItem("userId", user._id)
            toast.success("Logged In succesfilly")
            setTimeout(() => {
                nav('/');
            }, 2000);

        } catch (err: any) {
            console.error("Login error:", err.response || err);
            toast.error("LOgin failed")
            setTimeout(() => {
                nav('/');
            }, 2000);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Toaster position="top-right" reverseOrder={false} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-semibold mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <p className="text-center mt-4 text-gray-600">
                            Not registered?{" "}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={() => nav("/register")}
                            >
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>
            </div></>
    );
};

export default LoginPage;
