import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx';
import Home from './pages/Home.jsx'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/Editpost";
import AuthLayout from './components/AuthLayout.jsx'
import Post from "./pages/Post";
import Login from './pages/Login'
import AllPosts from "./pages/AllPosts";
// import AllPosts from "./pages/AllPosts";
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import {store } from"./store/store.js"
import { Provider } from 'react-redux';


const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[{
            path:'/home',
            element:<Home/>,
        },
        { 
            path:'/Login',
            element:(
            <AuthLayout authentication={false}>
                    <Login/>
                </AuthLayout>),
        },{
            path:'/signup',
            element:(<AuthLayout>
                 <Signup/>
            </AuthLayout>),
        }, {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ]
        }]
    )


    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
          <Provider store={store}>
          <RouterProvider router={router}/>
          </Provider>
        </React.StrictMode>,
)
