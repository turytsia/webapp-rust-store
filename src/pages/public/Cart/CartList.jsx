import CartItem from "./CartItem";

export default function CartList(props) {
  const content = props.products.map((product) => (
    <CartItem
      key={product._id}
      image={product.image}
      name={product.name}
      value={product.value}
      price={product.price}
      onRemove={props.onRemove.bind(null, product)}
    />
  ));
  return <ul className="cart__list">{content}</ul>;
}
