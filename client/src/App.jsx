import React from 'react';
import Login from './pages/login/login';
import Register from './pages/register/register';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import ProfileOther from './pages/profile/profileOther';
import NavBar from './components/navBar/navBar';
import LeftSide from './components/leftSide/leftSide';
import RightSide from './components/rightSide/rightSide';
import Followers from './pages/followers/followers';
import Following from './pages/followers/followings';
import { UidContext } from './AppContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import UnderConstruction from './pages/UnderConstructionPage';
function App() {

    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
                .then((res) => {
                    setUserId(res.data);
                })
                .catch((err) => console.log("No token"));
        };
        fetchToken();

        if (userId) dispatch(getUser(userId));
    }, [userId, dispatch]);

    const Layout = () => {
        return (
            <div className='app'>
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftSide />
                    <div style={{ flex: 5 }}>
                        <Outlet />
                    </div>
                    <RightSide />
                </div>
            </div>
        );
    };

    const router = createBrowserRouter([

        {
            path: "/",
            element: (
                <Layout />
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile",
                    element: <Profile />,
                },
                {
                    path: "/followers",
                    element: <Followers />
                },
                {
                    path: "/following",
                    element: <Following />
                },
                {
                    path: "/:id",
                    element: <ProfileOther />
                },
                {
                    path: "/dev",
                    element: <UnderConstruction />
                }
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ]);

    const router2 = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/:path",
            element: <Login />,
        }
    ]);

    return (
        userId === null ? <RouterProvider router={router2} /> :

            <div className='app'>
                <UidContext.Provider value={userId}>
                    <RouterProvider router={router} />
                </UidContext.Provider>
            </div>

    );
}

export default App;
