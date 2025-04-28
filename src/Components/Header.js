import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import { FaRegUser } from "react-icons/fa";
import { CartButton } from "../CartComponents/cart";

const Header1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isLoginPage = location.pathname === "/";

  return (
    <header className="flex items-center justify-between bg-yellow-50 px-6 py-3 shadow-md">
      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <span className="font-black text-2xl md:text-3xl text-yellow-400 tracking-tight">
          bring<strong className="text-green-600">It</strong>
        </span>
      </Link>

      {/* Right Section */}
      {!isLoginPage && (
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <div className="flex items-center">
            <CartButton />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-[112px] h-[50px] px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header1;
