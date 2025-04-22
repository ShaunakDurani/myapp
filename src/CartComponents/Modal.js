import { useDispatch, useSelector } from "react-redux";
import { hide as hideModal } from "../Utils/modalSlice";
import DiscountInfo from "./DiscountInfo";

const Modal = () => {
  const { type, data } = useSelector((state) => state.modal.modalData);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  const output =
    type === "discount" ? (
      <DiscountInfo data={data} onClose={handleClose} />
    ) : null;

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 overflow-hidden p-4">
      <div
        className="absolute z-10 inset-0 bg-black bg-opacity-[.65]"
        onClick={handleClose}
      />
      <div className="_modal">{output}</div>
    </div>
  );
};

export default Modal;
