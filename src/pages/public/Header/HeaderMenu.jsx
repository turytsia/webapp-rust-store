import Modal from "../../../components/Modal/Modal";
import HeaderNavigation from "./HeaderNavigation";

export default function HeaderMenu(props) {
  const preventPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <Modal onClick={props.onClose} isActive={props.isActive}>
      <nav onClick={preventPropagation} className="header-navigation__mobile">
        <div className="header-navigation__buttons">
          <button onClick={props.onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <HeaderNavigation onClose={props.onClose} />
      </nav>
    </Modal>
  );
}
