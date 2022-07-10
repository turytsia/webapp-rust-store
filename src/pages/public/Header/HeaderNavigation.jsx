import { NavLink } from "react-router-dom";

export default function HeaderNavigation(props) {
  return (
    <>
      <NavLink
        onClick={props.onClose}
        className={(navData) =>
          navData.isActive ? "header-navigation__active" : ""
        }
        to="/"
      >
        <i className="fa-solid fa-house"></i>
        Home
      </NavLink>
      <NavLink
        onClick={props.onClose}
        className={(navData) =>
          navData.isActive ? "header-navigation__active" : ""
        }
        to="/cart"
      >
        <i className="fa-solid fa-cart-shopping"></i>
        Cart
      </NavLink>
      <NavLink
        onClick={props.onClose}
        className={(navData) =>
          navData.isActive ? "header-navigation__active" : ""
        }
        to="/questions"
      >
        <i className="fa-solid fa-circle-question"></i>
        FAQ
      </NavLink>
    </>
  );
}
