import { useEffect, useState } from "react";
import MobileContainer from "../components/MobileContainer";
import { api, getProfile, uploadAvatar } from "../services/auth";
import { logout } from "../utils/auth";
import avatarPlaceholder from "../assets/user.png";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const getdata = async () => {
        try {
            const res = await api.get('/auth/profile')
            setUser(res.data)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getdata()
    }, []);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("avatar", file);


        try {
            await uploadAvatar(formData);
            const res = await api.get('/auth/profile')
            setUser(res.data);
            setFile(null);
        } finally {
            setUploading(false);
        }
    };

    if (!user) return null;

    return (
        <MobileContainer>
            <div className="pt-6">
                {/* Header */}
                <h2 className="px-6 text-[16px] font-medium text-[#1D1D1D]">
                    Account Settings
                </h2>

                <div className="mt-4 border-t border-[#E5E5E5]" />

                {/* Profile Section */}
                <div className="px-6 py-5 flex gap-4 items-start">
                    <div className="relative">
                        <img
                            src={user.avatar || avatarPlaceholder}
                            alt="avatar"
                            className="w-16 h-16 rounded-full object-cover"
                        />

                        {/* Upload icon overlay */}
                        <label className="absolute bottom-0 right-0 bg-[#6C25FF] w-5 h-5 rounded-full flex items-center justify-center cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <span className="text-white text-[10px]">✎</span>
                        </label>
                    </div>

                    <div>
                        <p className="text-[15px] font-medium text-[#1D1D1D]">
                            {user.fullName}
                        </p>
                        <p className="text-[14px] text-[#6B7280]">{user.email}</p>
                    </div>
                </div>

                {/* Bio text */}
                <div className="px-6 text-[13px] text-[#6B7280] leading-5">
                    Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                    Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
                    Sed Diam
                </div>

                <div className="mt-6 border-t border-dashed border-[#E5E5E5]" />

                {/* Upload Button */}
                {file && (
                    <div className="px-6 mt-4">
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full bg-[#6C25FF] text-white py-2 rounded-md text-[14px]"
                        >
                            {uploading ? "Uploading..." : "Save Avatar"}
                        </button>
                    </div>
                )}

                {/* Logout */}
                <div className="px-6 mt-10">
                    <button
                        onClick={() => {
                            logout()
                            window.location.href = "/login"
                        }}
                        className="text-[14px] text-red-500 font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </MobileContainer>
    );
}
