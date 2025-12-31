export default function MobileContainer({ children }) {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-[375px] h-[812px] bg-white overflow-hidden">
                {children}
            </div>
        </div>
    );
}
