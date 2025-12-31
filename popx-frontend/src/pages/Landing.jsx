import { useNavigate } from "react-router-dom";
import MobileContainer from "../components/MobileContainer";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <MobileContainer>
            <div className="h-full flex flex-col justify-end px-6 pb-10">
                <h1 className="text-[28px] font-medium text-black mb-2">
                    Welcome to PopX
                </h1>

                <p className="text-[18px] text-[#8A8A8A] leading-snug mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <button
                    onClick={() => navigate("/signup")}
                    className="bg-[#6C25FF] text-white text-[16px] font-medium py-3 rounded-md mb-3"
                >
                    Create Account
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="bg-[#E5D8FF] text-black text-[16px] font-medium py-3 rounded-md"
                >
                    Already Registered? Login
                </button>
            </div>
        </MobileContainer>
    );
}
