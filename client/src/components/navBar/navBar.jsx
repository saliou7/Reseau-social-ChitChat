import "./navBar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UidContext } from "../../AppContext";
const Navbar = () => {
    const uid = useContext(UidContext);
    const [clear, setClear] = useState(false);
    const [inputValue, setInputValue] = useState("")

    const handleClick = (evt) => {
        setInputValue(evt.target.value);
        if (evt.target.value !== '') {
            setClear(true)
        }
        else {
            setClear(false)
        }
    }

    const handleClear = () => {
        setInputValue("");
        setClear(false)
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>ChitChat</span>
                </Link>
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." value={inputValue} onChange={handleClick} />
                    {clear ? <HighlightOffOutlinedIcon onClick={handleClear} /> : null}
                </div>
            </div>
            <div className="right">
                <div className="user">
                    <img
                        src=""
                        alt=""
                    />
                    <span>fghdghdg</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
