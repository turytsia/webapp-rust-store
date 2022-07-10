import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";

import Button from "../../../../components/Button/Button";

export default function ProductItem(props) {
  const authContext = useContext(AuthContext);

  const { name, maxPrice, minPrice, image, minCount, id } = props.product;

  const imageUrl = image
    ? process.env.REACT_APP_BACKEND + '/public/' + image
    : "https://www.daveraine.com/img/products/no-image.jpg";

  const onUpdate = () => props.onUpdateModalOpen(props.product);

  const onDelete = () => props.onDeleteModalOpen(props.product);

  return (
    <li className="product-item">
      <Link className="product-item__link" to={`/products/${id}`}>
        <div className="product-item__image">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="product-item__content">
          <h3 className="product-item__name">{name}</h3>
          <div className="product-item__price">
            <span>${maxPrice}</span>
            <span>${minPrice}</span>
          </div>
          <span className="product-item__count">x{minCount}</span>
        </div>
      </Link>
      {authContext.isLoggedIn && (
        <div className="product-item__admin-buttons">
          <Button onClick={onUpdate}>
            <i className="fa-solid fa-pen"></i>
          </Button>
          <Button onClick={onDelete}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      )}
    </li>
  );
}
