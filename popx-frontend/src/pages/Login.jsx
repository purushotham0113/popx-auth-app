import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileContainer from "../components/MobileContainer";
import { loginUser, setToken } from "../services/auth";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const isDisabled = !form.email.trim() || !form.password.trim() || loading

    const handleLogin = async () => {
        try {
            setLoading(true);

            const res = await loginUser(form);

            // backend should return token
            if (res.token) {
                setToken(res.token);
                navigate("/profile");
            } else {
                throw new Error("Token missing");
            }
        } catch (err) {
            setError(err.msg || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };
    return (
        <MobileContainer>
            <div className="flex flex-col px-6 pt-12 min-h-screen">
                <h1 className="text-[28px] font-medium mb-2">
                    Signin to your PopX account
                </h1>

                <p className="text-[18px] text-[#8A8A8A] mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <label className="text-[13px] text-[#6C25FF] font-medium">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full border border-[#DADADA] rounded-md px-3 py-2 mb-4 text-[15px]"
                />

                <label className="text-[13px] text-[#6C25FF] font-medium">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full border border-[#DADADA] rounded-md px-3 py-2 mb-4 text-[15px]"
                />

                {error && (
                    <p className="text-red-500 text-[13px] mb-3">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleLogin}
                    disabled={isDisabled}
                    className="bg-[#6C25FF] hover:bg-blue-700 text-white transition-colors py-3 rounded-md mb-6 disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </MobileContainer>

    );
}
