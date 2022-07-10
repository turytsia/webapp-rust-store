import './products-aside.css'

import { useContext } from "react";

import { AuthContext } from "../../../../context/AuthProvider";

import Button from "../../../../components/Button/Button";

export default function ProductsNavigation(props) {
  const authContext = useContext(AuthContext);

  const categories = new Set(props.products.map((product) => product.category));

  const navigation = [...categories].map((category) => (
    <li key={category}>
      <button
        onClick={props.onCategory.bind(null, category)}
        className={props.category === category ? "products-aside--active" : ""}
      >
        {category}
      </button>
    </li>
  ));

  return (
    <aside className="products-aside">
      {authContext.isLoggedIn && (
        <Button onClick={props.onCreateModalOpen} reversed>
          Create New Product <i className="fa-solid fa-plus"></i>
        </Button>
      )}
      <div className="products-aside__wrapper">
        <input
          value={props.search}
          onChange={props.onSearch}
          type="text"
          placeholder="Search..."
        />
        <div className="products-aside__section">
          <h3>Category</h3>
          <ul>
            <li>
              <button
                onClick={props.onCategory.bind(null, "all")}
                className={
                  props.category === "all" ? "products-aside--active" : ""
                }
              >
                All
              </button>
            </li>
            {navigation}
          </ul>
        </div>
        <div className="products-aside__section">
          <h3>Contact</h3>
          <ul className="contact__list">
            <li>
              <a href="/" target="_blank">
                <i className="fa-brands fa-discord"></i>
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <i className="fa-brands fa-telegram"></i>
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
