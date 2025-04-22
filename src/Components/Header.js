import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO } from "../Utils/constants"; // use your logo path
import { FaRegUser } from "react-icons/fa";
import { CartButton } from "../CartComponents/cart";
import LocationPicker from "../BrowseComponents/LocationPicker";
import SearchBox from "../BrowseComponents/SearchBox";

const Header1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        dispatch(removeUser());
        navigate("/"); // redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // If we're on the login page, show only logo
  const isLoginPage = location.pathname === "/";

  return (
    <header className="flex flex-wrap items-center justify-between bg-yellow-50 p-4 shadow-sm">
      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <span className="font-black text-[28px] md:text-[34px] text-yellow-400 tracking-tight">
          bring<strong className="text-green-600">It</strong>
        </span>
      </Link>

      {/* Show rest only if not on login page */}
      {!isLoginPage && (
        <div className="flex flex-1 flex-wrap items-center justify-between gap-4 mt-4 sm:mt-0 sm:flex-nowrap sm:gap-2 w-full sm:w-auto">
          {/* Location Picker */}
          <div className=" mx-10 w-full sm:w-[200px] flex justify-center sm:justify-start">
            <LocationPicker />
          </div>

          {/* Search Box */}
          <div className="flex-1 min-w-[150px]">
            <SearchBox />
          </div>

          {/* User Icon */}
          <div className="flex items-center justify-center sm:px-2 cursor-pointer">
            <span className="text-gray-700 sm:hidden">
              <FaRegUser size={22} />
            </span>
          </div>

          {/* Cart Button */}
          <div className="hidden md:flex items-center">
            <CartButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header1;
