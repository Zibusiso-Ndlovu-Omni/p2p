import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/home/Home.jsx";
import Layout from "./components/navigation/Layout.jsx";
import About from "./pages/about/Index.jsx";
import Blog from "./pages/blog/Blog.jsx"
import BlogPost from "./pages/blog/BlogPost.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Exhibit from "./pages/exhibit/Exhibit.jsx";
import Magazine from "./pages/magazine/Magazine.jsx";
import Sponsorship from "./pages/sponsor/Index.jsx";
import SystemLayout from "./system/components/SystemLayout.jsx";
import ExhibitorDashboard from "./system/pages/exhibitor/ExhibitorDashboard.jsx";
import AttendantDashboard from "./system/pages/attendant/AttendantDashboard.jsx";
import {ExhibitorLogin, UserLogin} from "./system/pages/auth/Login.jsx";
import AggregatedUsers from "./system/pages/exhibitor/components/AggregatedUsers.jsx";
import Register from "./system/pages/auth/Register.jsx";
import AdminDashboard from "./system/pages/admin/AdminDashboard.jsx";
import RegisterOrganisation from "./system/pages/admin/RegisterOrganisation.jsx";
import RegisterExhibitor from "./system/pages/admin/RegisterExhibitor.jsx";
import {LandingPage} from "./system/pages/auth/HomeLogin.jsx";


const router = createBrowserRouter([
    // *****************************************************************************Public Routes ****************************************************************************
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
        {
            path: "blog/:id",
            element: <BlogPost />,
        },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "exhibit",
        element: <Exhibit />,
      },
      {
        path: "magazine",
        element: <Magazine />,
      },
      {
        path: "sponsor",
        element: <Sponsorship />,
      },
    ],
  },
    // *****************************************************************************System Routes ****************************************************************************
  {
    path: "/auth",
    element: <LandingPage />,
  },
  {
    path: "/exhibitor-login",
    element: <ExhibitorLogin />,
  },
  {
    path: "/user-login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
    // *****************************************************************************System Authenticated Routes ****************************************************************************
  {
    path: "/exhibitor",
    element: <SystemLayout />,
    children: [
      {
        path: "dashboard",
        element: <ExhibitorDashboard />,
      },
      {
        path: "aggregated-users",
        element: <AggregatedUsers />,
      },
    ]
  },
  {
    path: "/user-dashboard",
    element: <SystemLayout />,
    children: [
      {
        index: true,
        element: <AttendantDashboard />,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <SystemLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "register-organisation",
        element: <RegisterOrganisation />,
      },
      {
        path: "register-exhibitor",
        element: <RegisterExhibitor />,
      }
    ]
  }

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;