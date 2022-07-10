import './products-list.css'

import ProductItem from "./ProductItem";

export default function ProductsList(props) {
  const content = props.products.map((product) => (
    <ProductItem
      key={product._id}
      onDeleteModalOpen={props.onDeleteModalOpen}
      onUpdateModalOpen={props.onUpdateModalOpen}
      product={{ id: product._id, ...product }}
    />
  ));
  return <ul className="products__list">{content}</ul>;
}
