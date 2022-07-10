import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useHttp, { _getProduct } from "../../../../hooks/use-http";

import "./product.css";

import { cartActions } from "../../../../redux/cart.slice";

import Message from "../../../../components/Message/Message";
import Button from "../../../../components/Button/Button";
import Loading from "../../../../components/Loading/Loading";

const defaultProductState = {
  name: "",
  category: "",
  minCount: 0,
  maxCount: 0,
};

export default function Product() {
  const params = useParams();
  const [getProduct, getProductLoading] = useHttp(_getProduct);
  const [product, setProduct] = useState(defaultProductState);

  const isLoading = getProductLoading;

  const defaultValue = product.minCount;
  const defaultPrice = product.minPrice;

  const [value, setValue] = useState(defaultValue);
  const [price, setPrice] = useState(defaultPrice);

  const [isMessageActive, setMessageActive] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const isInCart = cart.products.find((prod) => prod._id === product._id);

  const onMessageOpen = () => setMessageActive(true);
  const onMessageClose = () => setMessageActive(false);

  useEffect(() => {
    setValue(defaultValue);
    setPrice(defaultPrice);
  }, [defaultPrice, defaultValue]);

  useEffect(() => {
    const priceForUnit = defaultPrice / defaultValue;
    setPrice(parseFloat(priceForUnit * value).toFixed(2));
  }, [value, defaultValue, defaultPrice]);

  useEffect(() => {
    getProduct({ id: params.id })
      .then((response) => {
        if (response.error) {
          console.error(response.message);
        } else {
          setProduct(response.product);
        }
      })
      .catch((error) => console.error(error));
  }, [getProduct, params.id]);

  const onValueChange = (e) => {
    setValue((prevValue) => {
      if (e.target.value < defaultValue) {
        return prevValue;
      } else {
        return e.target.value;
      }
    });
  };

  const onAdd = () => {
    setValue((prevValue) => prevValue + defaultValue);
    setPrice((prevPrice) => prevPrice + defaultPrice);
  };

  const onMinus = () => {
    setValue((prevValue) => {
      if (prevValue - defaultValue < defaultValue) {
        return defaultValue;
      } else {
        return prevValue - defaultValue;
      }
    });
    setPrice((prevPrice) => {
      if (prevPrice - defaultPrice < defaultPrice) {
        return defaultPrice;
      } else {
        return prevPrice - defaultPrice;
      }
    });
  };

  const onCartAddHandler = () => {
    setMessage(
      `${product.name} ${
        isInCart ? "removed from the cart" : "successfuly added to the cart"
      }`
    );
    dispatch(
      cartActions.insert({
        product: {
          ...product,
          value,
          price,
        },
      })
    );
    onMessageOpen();
  };

  return (
    <section>
      <Loading isActive={isLoading} />
      <Message
        isActive={isMessageActive}
        message={message}
        onClose={onMessageClose}
      />
      <div className="product__content">
        <div className="product__head">
          <div className="product__image">
            <img
              src={
                product.image
                  ? process.env.REACT_APP_BACKEND + "/public/" + product.image
                  : "https://www.daveraine.com/img/products/no-image.jpg"
              }
              alt=""
            />
          </div>
          <div className="product__desc">
            <div>
              <h2>{product.name}</h2>
            </div>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
        <aside className="product__info">
          <div className="product__price">
            <span>Price</span>
            <h2>${parseFloat(price).toFixed(2)}</h2>
          </div>
          <div className="product__count">
            <button onClick={onMinus}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <input onChange={onValueChange} type="number" value={value} />
            <button onClick={onAdd}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <Button
            onClick={onCartAddHandler}
            className={isInCart ? "product__cart--active" : ""}
          >
            {isInCart ? (
              <>
                Remove from Cart <i className="fa-solid fa-trash-can"></i>
              </>
            ) : (
              <>
                Add to Cart <i className="fa-solid fa-cart-plus"></i>
              </>
            )}
          </Button>
        </aside>
      </div>
    </section>
  );
}
