import { useSelector, useDispatch } from "react-redux";
import useHttp, { _getDiscordHook } from "../../../hooks/use-http";

import "./styles/cart.css";

import CartList from "./CartList";
import Message from "../../../components/Message/Message";
import Button from "../../../components/Button/Button";
import Loading from "../../../components/Loading/Loading";

import { cartActions } from "../../../redux/cart.slice";
import { useState } from "react";

export default function Cart() {
  const user = JSON.parse(localStorage.getItem("user")) ?? {};

  const [name, setName] = useState(user.name ?? "");
  const [discord, setDiscord] = useState(user.discord ?? "");

  const [isMessageActive, setMessageActive] = useState(false);
  const [message, setMessage] = useState("");

  const [getDiscordHook, getDiscordHookLoading] = useHttp(_getDiscordHook);

  const isLoading = getDiscordHookLoading;

  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);

  const isValidInput = name && discord && products.length > 0;

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDiscordChange = (e) => {
    setDiscord(e.target.value);
  };

  const onRemove = (product) => {
    dispatch(cartActions.insert({ product }));
  };

  const onMessageOpen = () => {
    setMessageActive(true);
  };

  const onMessageClose = () => {
    setMessageActive(false);
  };

  // FIX THIS
  const onOrder = () => {
    const user = {
      name,
      discord,
    };

    localStorage.setItem("user", JSON.stringify(user));

    let prods = "";

    for (const product of products) {
      prods += `   **${product.name}** [ x${product.value} ]`;
    }

    const msg = {
      content: `
============================================================
   New order ( $${total} )
${prods}

    **Contact info:**
    Name: ${name}
    Discord: ${discord}
============================================================
    Date: ${new Date().toISOString().replace("T", " ").slice(0, 21)}
    `,
    };

    setMessage(
      `${name}, the order was sent, please wait for admin to contact you :)`
    );

    getDiscordHook()
      .then((response) => {
        return fetch(response.hook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(msg),
        });
      })
      .then(() => {
        dispatch(cartActions.clear());
        onMessageOpen();
      });
  };

  return (
    <section>
      <Loading isActive={isLoading} />
      <Message
        isActive={isMessageActive}
        message={message}
        onClose={onMessageClose}
      />
      <div className="cart__content">
        <CartList products={products} onRemove={onRemove} />
        <aside className="cart__aside">
          <div className="cart__form">
            <h2>Customer Info</h2>
            <div className="cart__input">
              <label htmlFor="name">Your Name</label>
              <input
                onChange={onNameChange}
                value={name}
                type="text"
                name="name"
              />
            </div>
            <div className="cart__input">
              <label htmlFor="name">Your Discord</label>
              <input
                onChange={onDiscordChange}
                value={discord}
                type="text"
                name="name"
              />
            </div>
          </div>
          <div className="cart__total">
            <h4>Total:</h4>
            <h2>${total.toFixed(2)}</h2>
          </div>
          <div className="cart__buttons">
            <Button disabled={!isValidInput} onClick={onOrder}>
              Order
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
