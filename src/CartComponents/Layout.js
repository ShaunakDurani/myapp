import { useEffect } from "react";
import Footer from "../Components/Footer";
import BrandPromotion from "./BrandPromotion";
import CartButtonBig from "./CartButtonBig";
import Modal from "./Modal";
import CartPanel from "./CartPanel";
import { useSelector } from "react-redux";
import Header1 from "../Components/Header";

const Layout = ({ noFooter, component }) => {
  const modalShown = useSelector((state) => state.modal.visible);
  const cartShown = useSelector((state) => state.ui.cartPanel);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <Header1 />
        <main className="pt-28 sm:pt-24">{component}</main>
        {!noFooter && (
          <>
            <BrandPromotion />
            <Footer />
          </>
        )}
        <CartButtonBig />
      </div>
      {cartShown && <CartPanel />}
      {modalShown && <Modal />}
    </>
  );
};

export default Layout;
