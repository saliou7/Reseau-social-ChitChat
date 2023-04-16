import React from 'react';
import Login from './pages/login/login';
import Register from './pages/register/register';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import "./style.scss";
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import NavBar from './components/navBar/navBar';
import LeftSide from './components/leftSide/leftSide';
import RightSide from './components/rightSide/rightSide';
import Followers from './pages/followers/followers';
import Following from './pages/followers/followings';
import { UidContext } from './AppContext';
import axios from 'axios';


function App() {

    const [uid, setUid] = useState(null);


    useEffect(() => { // Fetch token
        const fetchToken = async () => {
            console.log(process.env.REACT_APP_MY_API_URL);
            await axios({
                method: "get",
                // url: `${process.env.REACT_APP_MY_API_URL}jwtid`,
                url: `http://localhost:5000/jwtid`,
                withCredentials: false, // Send cookie
            }).then((res) => setUid(res.data) // Set token in state
            ).catch((err) => console.log("No=token")); // No token
        };
        fetchToken(); // Call function
    }, [uid]); // Empty array to avoid infinite loop


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

    const ProtectedRoute = ({ children }) => {
        if (!uid) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile/:id",
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

    return (
        <div className='app'>
            <UidContext.Provider value={uid}>
                <RouterProvider router={router} />
            </UidContext.Provider>
        </div>
    );
}

export default App;
