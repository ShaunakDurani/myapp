// AppLayout.js
import { useSelector } from "react-redux";
import Header1 from "./Header";
import CartPanel from "../CartComponents/CartPanel";

const AppLayout = ({ children }) => {
  const showCart = useSelector((state) => state.ui.showCart);

  return (
    <div className="relative">
      <Header1 />
      <main>{children}</main>
      {showCart && <CartPanel />}
    </div>
  );
};

export default AppLayout;
