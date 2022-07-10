export default function CartItem(props) {
  return (
    <li className="cart__item">
      <div className="cart__item-image">
        <img
          src={
            props.image
              ? process.env.REACT_APP_BACKEND + "/public" + props.image
              : "https://www.daveraine.com/img/products/no-image.jpg"
          }
          alt={props.name}
        />
      </div>
      <div className="cart__item-type">
        <h2>{props.name}</h2>
        <span>${props.price}</span>
      </div>

      <div className="cart__item-buttons">
        <span>x{props.value}</span>
        <button onClick={props.onRemove}>X</button>
      </div>
    </li>
  );
}
