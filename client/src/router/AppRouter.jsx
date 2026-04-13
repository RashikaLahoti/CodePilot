import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '../layout/AuthLayout'
import HomeLayout from '../layout/HomeLayout.jsx'
import Home from '../pages/Home.jsx'

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AuthLayout />
        },
        {
            path: "/home",
            element: <HomeLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter