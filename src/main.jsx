import React from "react";
import ReactDOM from "react-dom/client";

import Root from "./routes/root";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import Setting from "./routes/setting";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/setting",
        element: <Setting />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
