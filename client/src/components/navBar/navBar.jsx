import "./navBar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowHandler from "../add";
import { useRef, useEffect, useState } from "react";


const Navbar = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [clear, setClear] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const searchRef = useRef(null); // Crée une référence à la div contenant la barre de recherche

    useEffect(() => {
        // Ajoute un event listener sur l'objet document
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        // Vérifie si le clic a été effectué en dehors de la div contenant la barre de recherche
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowResults(false);
        }
    };


    const handleClick = (evt) => {
        const input = evt.target.value;
        setInputValue(evt.target.value);
        const filteredUsers = usersData.filter(user => user.pseudo.toLowerCase().startsWith(input.toLowerCase()));
        setFilteredUsers(filteredUsers);
        setShowResults(true);
        if (evt.target.value !== '') {
            setClear(true)
        }
        else {
            setShowResults(false);
            setClear(false)
        }
    }
    const handleSearchClick = () => {
        if (inputValue !== "") {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }

    const handleClear = () => {
        setShowResults(false);
        setInputValue("");
        setClear(false)
    }

    const noResults = "No result found for '" + inputValue + "'";


    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>ChitChat</span>
                </Link>
            </div>

            <div className="search" ref={searchRef} >
                <div className="searchInputs">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search people" value={inputValue} onChange={handleClick} onClick={handleSearchClick} />
                    {clear ? <HighlightOffOutlinedIcon onClick={handleClear} /> : null}
                </div>
                {showResults && (
                    <div className="results">
                        {filteredUsers.length === 0 ? (
                            <div className="noResults">{noResults}</div>
                        ) : (

                            filteredUsers.map(user => (
                                userData._id !== user._id ? (
                                    <div className="user" key={user._id}>
                                        <div className="userInfo">
                                            <Link to={`/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                                <img src={user.profile_picture} alt="user-pic" />
                                            </Link>
                                            <Link to={`/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                                <span>{user.pseudo}</span>
                                            </Link>
                                        </div>
                                        <FollowHandler idToFollow={user._id} />
                                    </div>
                                ) : (

                                    <div className="user" key={user._id}>
                                        <div className="userInfo">
                                            <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                                                <img src={user.profile_picture} alt="user-pic" />
                                            </Link>
                                            <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                                                <span>{user.pseudo}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )

                            ))
                        )}
                    </div>
                )}
            </div>


            <div className="right">
                <div className="user">
                    <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                        <img
                            src={userData.profile_picture}
                            alt=""
                        />
                    </Link>
                    <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                        <span>{userData.pseudo}</span>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default Navbar;
