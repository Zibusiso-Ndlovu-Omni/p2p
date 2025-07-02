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
import ExhibitorDashboard from "./system/pages/ExhibitorDashboard.jsx";
import AttendantDashboard from "./system/pages/AttendantDashboard.jsx";



const router = createBrowserRouter([
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
  {
    path: "/dashboard",
    element: <SystemLayout />,
    children: [
      {
        index: true,
        element: <ExhibitorDashboard />,
      },
    ]
  },
  {
    path: "/home",
    element: <SystemLayout />,
    children: [
      {
        index: true,
        element: <AttendantDashboard />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;