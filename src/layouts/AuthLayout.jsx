import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
            <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-6 md:p-8">
                {/* Logo / App Name */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary">
                        AssetVerse
                    </h1>
                    <p className="text-sm text-base-content/70">
                        Manage assets efficiently
                    </p>
                </div>

                {/* Auth Pages */}
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
