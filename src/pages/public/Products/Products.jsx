import { useState, useEffect } from "react";
import useHttp, {
  _getProducts,
  _createProduct,
  _updateProduct,
  _deleteProduct,
} from "../../../hooks/use-http";

import "./products.css";

import ProductsList from "./Product List/ProductsList";
import ProductsAside from "./Products Aside/ProductsAside";
import ProductForm from "./Product Form/ProductForm";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Message from "../../../components/Message/Message";
import Loading from "../../../components/Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [getProducts, getProductsLoading] = useHttp(_getProducts);
  const [updateProduct, updateProductLoading] = useHttp(_updateProduct);
  const [deleteProduct, deleteProductLoading] = useHttp(_deleteProduct);
  const [createProduct, createProductLoading] = useHttp(_createProduct);

  const [isCreateModalActive, setCreateModalActive] = useState(false);
  const [isUpdateModalActive, setUpdateModalActive] = useState(false);
  const [isDeleteModalActive, setDeleteModalActive] = useState(false);

  const isLoading =
    getProductsLoading ||
    updateProductLoading ||
    deleteProductLoading ||
    createProductLoading;

  const onSearch = (e) => setSearch(e.target.value.toLowerCase());
  const onCategory = (type) => setCategory(type);

  const sortedProducts = products
    .filter((product) => product.name.toLowerCase().includes(search))
    .filter((product) => category === "all" || product.category === category);

  const onCreateModalOpen = () => setCreateModalActive(true);
  const onCreateModalClose = () => setCreateModalActive(false);
  const onErrorClose = () => setError("");

  const onUpdateModalClose = () => {
    setProduct({});
    setUpdateModalActive(false);
  };

  const onDeleteModalClose = () => {
    setProduct({});
    setDeleteModalActive(false);
  };

  const onUpdateModalOpen = (product) => {
    setProduct(product);
    setUpdateModalActive(true);
  };

  const onDeleteModalOpen = (product) => {
    setProduct(product);
    setDeleteModalActive(true);
  };
  const onCreate = (inputs) => {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("minPrice", inputs.minPrice);
    formData.append("maxPrice", inputs.maxPrice);
    formData.append("minCount", inputs.minCount);
    formData.append("maxCount", inputs.maxCount);
    formData.append("category", inputs.category);
    formData.append("image", inputs.image);
    createProduct({
      body: formData,
    })
      .then((response) => {
        if (response.error) {
          setError(response.message);
        } else {
          onCreateModalClose();
          setProducts(response.products);
        }
      })
      .catch((error) => console.error(error));
  };

  const onDelete = () => {
    deleteProduct({ id: product._id })
      .then((response) => {
        if (response.error) {
          setError(response.message);
        } else {
          setProducts(response.products);
          onDeleteModalClose();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onUpdate = (inputs) => {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("minPrice", inputs.minPrice);
    formData.append("maxPrice", inputs.maxPrice);
    formData.append("minCount", inputs.minCount);
    formData.append("maxCount", inputs.maxCount);
    formData.append("category", inputs.category);
    formData.append("image", inputs.image);
    updateProduct({ id: product._id, body: formData })
      .then((response) => {
        if (response.error) {
          setError(response.message);
        } else {
          setProducts(response.products);
          onUpdateModalClose();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProducts()
      .then((response) => {
        if (response.error) {
          setError(response.message);
        } else {
          setProducts(response.products);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [getProducts]);

  const content =
    sortedProducts.length === 0 ? (
      <h2 className="products__list-message">No items were found</h2>
    ) : (
      <ProductsList
        onDelete={onDelete}
        onUpdate={onUpdate}
        products={sortedProducts}
        onUpdateModalOpen={onUpdateModalOpen}
        onDeleteModalOpen={onDeleteModalOpen}
      />
    );

  return (
    <section>
      <Loading isActive={isLoading} />
      <Message isActive={!!error} message={error} onClose={onErrorClose} />
      <Modal
        className="product-modal-delete"
        isActive={isDeleteModalActive}
        onClick={onDeleteModalClose}
      >
        <h2>Are you sure, you want to remove product?</h2>
        <div className="product-modal-delete__buttons">
          <Button onClick={onDelete}>Yes</Button>
          <Button onClick={onDeleteModalClose} reversed>
            Cancel
          </Button>
        </div>
      </Modal>
      <ProductForm
        name="Update"
        onSubmit={onUpdate}
        isActive={isUpdateModalActive}
        onClose={onUpdateModalClose}
        product={product}
      />
      <ProductForm
        name="Create"
        onSubmit={onCreate}
        isActive={isCreateModalActive}
        onClose={onCreateModalClose}
      />
      <div className="products__content">
        {content}
        <ProductsAside
          products={products}
          category={category}
          seach={search}
          setProducts={setProducts}
          onCategory={onCategory}
          onSearch={onSearch}
          onCreateModalOpen={onCreateModalOpen}
        />
      </div>
    </section>
  );
}
