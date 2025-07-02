import {Outlet} from "react-router-dom";
import Header from "./Header.jsx";

const SystemLayout = () => {
    return (
        <div className="min-h-screen bg-gray-800">
            <Header />
            <Outlet />
        </div>
    );
};

export default SystemLayout;