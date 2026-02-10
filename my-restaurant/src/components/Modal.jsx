import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="modal p-0 rounded-lg shadow-xl backdrop:bg-black/50" onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal"),
  );
}

export default Modal;
