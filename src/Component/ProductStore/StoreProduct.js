import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { ProductsContext } from "../Context/ProductsContext";

const StoreProduct = ({ storeDivision, filteredProducts }) => {
  //use context
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const { productData } = useContext(ProductsContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.sys.id === product.sys.id);
  }; //check this item already in cart

  return (
    <div className="container mt-3">
      {filteredProducts && (
        <div className="row product-shelf">
          {filteredProducts.map((product, index) => {
            return (
              <div
                className={`${storeDivision} pr-2 pl-2 pb-2 pt-2 product-lot`}
                key={index}
              >
                <div className="card">
                  <div className="product-thumb ">
                    <Link
                      to={`/shop/detail/${product.fields.slug}`}
                      className="text-center"
                    >
                      <img
                        src={"https:" + product.fields.image[0].fields.file.url}
                        alt=""
                        className="card-img-top rounded product-image"
                      />
                    </Link>
                  </div>
                  <div className="product-desc card-body">
                    <Link
                      to={`/shop/detail/${product.fields.slug}`}
                      className="product-name text-center"
                    >
                      <p>{product.fields.productName}</p>
                    </Link>
                    <p className="text-center product-price">
                      <span>£</span>
                      {product.fields.price + ".00"}
                    </p>
                    <div className="product-action">
                      <div className="container row justify-content-center">
                        <div className="quick-view d-flex justify-content-center px-2">
                          <a
                            href="/"
                            className="rounded-circle d-flex justify-content-center"
                          >
                            <i className="far fa-eye align-self-center"></i>
                          </a>
                        </div>
                        <div className="add-to-cart d-flex justify-content-center px-2">
                          {isInCart(product) && (
                            <a
                              href="/"
                              className="rounded-circle d-flex justify-content-center"
                              onClick={(e) => {
                                e.preventDefault();
                                return increase(product);
                              }}
                            >
                              <i className="fas fa-shopping-cart align-self-center"></i>
                            </a>
                          )}

                          {!isInCart(product) && (
                            <a
                              href="/"
                              className="rounded-circle d-flex justify-content-center"
                              onClick={(e) => {
                                e.preventDefault();
                                return addProduct(product);
                              }}
                            >
                              <i className="fas fa-shopping-cart align-self-center"></i>
                            </a>
                          )}
                        </div>
                        <div className="add-to-compare d-flex justify-content-center px-2">
                          <a
                            href="/"
                            className="rounded-circle d-flex justify-content-center"
                          >
                            <i className="fas fa-balance-scale align-self-center"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoreProduct;
