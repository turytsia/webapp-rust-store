import "./styles/Auth.css";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import useForm from "../../../hooks/use-form";
import useHttp, { _loginUser } from "../../../hooks/use-http";

import { AuthContext } from "../../../context/AuthProvider";
import { CSSTransition } from "react-transition-group";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Loading from "../../../components/Loading/Loading";

export default function Auth() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loginUser, loginUserLoading] = useHttp(_loginUser);

  const isLoading = loginUserLoading;

  const onCancel = () => navigate(-1);

  const onLogin = (inputs) => {
    loginUser({ body: { ...inputs } }).then((response) => {
      if (response.error) {
        setError(response.message);
      } else {
        setError("");
        authContext.login(response.token);
        navigate("/");
      }
    });
  };

  const [onChange, onSubmit] = useForm(onLogin);

  return (
    <section>
      <Loading isActive={isLoading} />
      <form onSubmit={onSubmit} className="auth-form">
        <h1>Admin</h1>
        <Input
          onChange={onChange}
          name="username"
          label="Username"
          type="text"
        />
        <Input
          onChange={onChange}
          name="password"
          label="Password"
          type="password"
        />
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={!!error}
          timeout={400}
          classNames="modal-slide"
        >
          <div className="auth-form__error">
            <h3>{error}</h3>
          </div>
        </CSSTransition>

        <div className="auth-form__buttons">
          <Button type="submit">Login</Button>
          <Button reversed onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
