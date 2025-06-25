import {Outlet} from "react-router-dom";
import Navigation from "./Navigation.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-800">
            <Navigation />
                <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;