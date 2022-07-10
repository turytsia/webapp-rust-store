import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./loading.css";

export default function Loading(props) {
  return createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.isActive}
      timeout={400}
      classNames="modal-slide"
    >
      <div className="loading">
        <div className="lds-hourglass"></div>
      </div>
    </CSSTransition>,
    document.getElementById("root-loading")
  );
}
