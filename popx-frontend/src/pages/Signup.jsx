import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileContainer from "../components/MobileContainer";
import { registerUser } from "../services/auth";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        companyName: "",
        isAgency: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setForm({
            ...form,
            [name]: type === "radio" ? value === "true" : value,
        });
    };

    const handleSignup = async () => {
        setError("");

        // basic frontend validation
        if (
            !form.fullName ||
            !form.phone ||
            !form.email ||
            !form.password ||
            !form.companyName
        ) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            await registerUser(form); // 🔗 backend integration
            navigate("/login"); // correct flow
        } catch (err) {
            setError(err.msg || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MobileContainer>
            <div className="px-6 pt-10 h-full flex flex-col">
                <h1 className="text-[28px] font-medium mb-6">
                    Create your PopX account
                </h1>

                <div className="space-y-4 flex-1">
                    {/* Full Name */}
                    <div>
                        <label className="text-[13px] text-[#6C25FF] font-medium">Full Name *</label>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            placeholder="Marry Doe"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-[13px] text-[#6C25FF] font-medium">Phone number *</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            placeholder="9876543210"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-[13px] text-[#6C25FF] font-medium">Email address *</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            placeholder="marry@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-[13px] text-[#6C25FF] font-medium">Password *</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            placeholder="******"
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="text-[13px] text-[#6C25FF] font-medium">Company name *</label>
                        <input
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            placeholder="PopX Pvt Ltd"
                        />
                    </div>

                    {/* Agency */}
                    <div>
                        <p className="text-[13px] mb-2">Are you an Agency? *</p>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="isAgency"
                                    value="true"
                                    checked={form.isAgency === true}
                                    onChange={handleChange}
                                />
                                Yes
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="isAgency"
                                    value="false"
                                    checked={form.isAgency === false}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="bg-[#6C25FF] hover:bg-blue-700 text-white transition-colors py-3 rounded-md mb-6 disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Account"}
                </button>
            </div>
        </MobileContainer>
    );
}
