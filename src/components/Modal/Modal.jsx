import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./modal.css";

export default function Modal(props) {
  const onClick = (e) => {
    e.stopPropagation();
  };
  const content = (
    <CSSTransition mountOnEnter unmountOnExit in={props.isActive} timeout={400} classNames="modal-slide">
      <div onClick={props.onClick} className="modal">
        <div onClick={onClick} className={`modal-wrapper ${props.className}`}>
          {props.children}
        </div>
      </div>
    </CSSTransition>
  );
  return createPortal(content, document.getElementById("root-modal"));
}
