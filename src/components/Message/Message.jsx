import './message.css'

import { createPortal } from "react-dom";
import { useEffect } from "react";

import { CSSTransition } from "react-transition-group";

export default function Message(props) {
  useEffect(() => {
    if (props.isActive) {
      setTimeout(() => {
        props.onClose();
      }, 2000);
    }
  }, [props]);
  const content = (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.isActive}
      timeout={400}
      classNames="slide-in"
    >
      <section className="message">
        <p>{props.message}</p>
        <button onClick={props.onClose}>X</button>
      </section>
    </CSSTransition>
  );
  return createPortal(content, document.getElementById("root-message"));
}
