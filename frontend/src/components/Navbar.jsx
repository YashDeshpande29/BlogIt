import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { HiMoon, HiOutlineMagnifyingGlass, HiSun } from "react-icons/hi2";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const [toggle,setToggle]=useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 md:px-20 py-4">
        {/* Logo */}
        <h1 className="text-lg md:text-xl font-extrabold text-primary-color">
          <Link to="/">BlogIt</Link>
        </h1>

        {/* Search Bar (hidden on mobile) */}
        {path === "/" && (
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-md p-2 shadow-inner">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-4 py-2 border-none outline-none text-gray-700 bg-transparent w-96"
              placeholder="Search a post"
              type="text"
            />
            <button
              onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
              className="cursor-pointer text-primary-color hover:text-primary-color2 flex items-center"
            >
              <BsSearch className="text-xl" />
            </button>
          </div>
        )}

        {/* Navigation Links (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center space-x-4">
          {user ? (
            <Link to="/write" className="text-primary-color hover:text-primary-color2">
              Write
            </Link>
          ) : (
            <Link to="/login" className="text-primary-color hover:text-primary-color2">
              Login
            </Link>
          )}
          {user ? (
            <div onClick={showMenu} className="relative cursor-pointer text-primary-color hover:text-primary-color2">
              <FaBars />
              {menu && <Menu />}
            </div>
          ) : (
            <Link to="/register" className="text-primary-color hover:text-primary-color2">
              Register
            </Link>
          )}
        </div>

        {/* Menu Toggle (shown on mobile) */}
        <div onClick={showMenu} className="md:hidden text-lg cursor-pointer">
          <FaBars />
          {menu && <Menu />}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
