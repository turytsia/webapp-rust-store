import './product-form.css'

import useForm from "../../../../hooks/use-form";

import Modal from "../../../../components/Modal/Modal";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import ImageInput from "../../../../components/ImageInput/ImageInput";

export default function ProductForm(props) {
  const [onChange, onSubmit] = useForm(props.onSubmit);
  const product = props.product ?? {};

  return (
    <Modal
      className="product-form"
      isActive={props.isActive}
      onClick={props.onClose}
    >
      <form onSubmit={onSubmit}>
        <h2>{props.name}</h2>
        <div className="product-form__content">
          <Input
            onChange={onChange}
            type="text"
            name="name"
            label="Product's Name*"
            value={product.name}
          />
          <Input
            onChange={onChange}
            textarea
            type="text"
            name="description"
            label="Description"
            value={product.description}
          />
          <Input
            onChange={onChange}
            type="text"
            name="minCount"
            label="Min. Count*"
            value={product.minCount}
          />
          <Input
            onChange={onChange}
            type="text"
            name="maxCount"
            label="Max. Count*"
            value={product.maxCount}
          />
          <Input
            onChange={onChange}
            type="text"
            name="minPrice"
            label="Current Price*"
            value={product.minPrice}
          />
          <Input
            onChange={onChange}
            type="text"
            name="maxPrice"
            label="Old Price (For sale)*"
            value={product.maxPrice}
          />
          <Input
            onChange={onChange}
            type="text"
            name="category"
            label="Category*"
            value={product.category}
          />
          <ImageInput
            name="image"
            value={
              product.image
                ? process.env.REACT_APP_BACKEND +'/public/' + product.image
                : ""
            }
            onChange={onChange}
          />
        </div>
        <div className="product-form__buttons">
          <Button type="submit">{props.name}</Button>
          <Button onClick={props.onClose} reversed>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
