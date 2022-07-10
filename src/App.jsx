import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import Products from "./pages/public/Products/Products";
import Cart from "./pages/public/Cart/Cart";
import Product from "./pages/public/Products/Product Page/Product";
import FAQ from "./pages/public/FAQ";
import Auth from "./pages/public/Auth/Auth";
import AuthProvider from "./context/AuthProvider";

import Header from "./pages/public/Header/Header";

import Wrapper from "./components/Wrapper/Wrapper";
import Background from "./components/Background/Background";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Provider store={store}>
          <Background />
          <Header />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/questions" element={<FAQ />} />
              <Route path="/admin" element={<Auth />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </Wrapper>
        </Provider>
      </Router>
    </AuthProvider>
  );
}

export default App;
