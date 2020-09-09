import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import { StoreContext } from "../Context/StoreContext";
import ReactTooltip from "react-tooltip";
import BestSeller from "./BestSeller";

const ShopSideBar = ({ category }) => {
  const { productData } = useContext(ProductsContext);
  const { setProductShop } = useContext(StoreContext);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10);
  const [bestseller, setBestseller] = useState("");
  const minSlider = useRef(); //Mutating the .current property won’t cause a re-render.
  const maxSlider = useRef();

  let filteredProducts = [...productData];

  const handlePriceSlider = (event) => {
    setPriceMax(event.target.value);
  };
  const handleInputMax = (event) => {
    setPriceMax(event.target.value);
  };
  const handleInputMin = (event) => {
    setPriceMin(event.target.value);
  };
  const hanldeSubmit = (event) => {
    event.preventDefault();
    filteredProducts = filteredProducts.filter((product) => {
      let showProduct = false;
      if (
        product.fields.price >= priceMin &&
        product.fields.price <= priceMax
      ) {
        showProduct = true;
      }
      return showProduct === true;
    });

    setProductShop(filteredProducts);
    console.log("object");
  };
  useEffect(() => {
    if (productData) {
      minSlider.current = Math.min(
        ...productData.map((item) => item.fields.price)
      );
      maxSlider.current = Math.max(
        ...productData.map((item) => item.fields.price)
      );
      const arrangeBestSeller = productData.filter((e) => {
        //retrieve best seller list with special tag as "HOT"
        let found = false;
        if (e.fields.special) {
          if (
            e.fields.special.find((element) => element.toUpperCase() === "HOT")
          ) {
            found = true;
          }
        }
        return found === true;
      });
      setBestseller(arrangeBestSeller);
    }
  }, [productData]);
  return (
    <div className="col-sm-3" id="sidebar">
      <div className="search-shop pt-2">
        <input
          type="search"
          className="form-control ds-input"
          placeholder="Search..."
          autoComplete="off"
        />
      </div>
      <div className="category pt-2">
        <h3 className="shop-heading">Categories</h3>
        <ul className="list-group list-group-flush">
          {category.map((e, index) => {
            return (
              <li className="list-group-item list-category" key={index}>
                <Link to={`/shop/${e.toUpperCase()}`}>{e.toUpperCase()}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="price-filter pt-2">
        <h3 className="shop-heading">Filter by Price</h3>
        <form>
          <div className="form-group price-slider">
            <label htmlFor="priceSliderControl">Example Range input</label>
            <input
              type="range"
              className="form-control-range"
              name="priceRange"
              data-tip
              data-for="priceSliderControl"
              onChange={handlePriceSlider}
              value={priceMax}
              min={minSlider.current}
              max={maxSlider.current}
              step="0.5"
            />
            <ReactTooltip id="priceSliderControl" place="bottom" effect="float">
              {priceMax}
            </ReactTooltip>
          </div>
        </form>
        <div className="row pt-2 justify-content-end justify-content-center">
          <button className="btn btn-secondary col-sm-4" onClick={hanldeSubmit}>
            Filter
          </button>
          <div className="col-sm-8 row">
            <input
              type="number"
              className="min-price col-sm form-control"
              value={priceMin}
              onChange={handleInputMin}
            />
            <input
              type="number"
              className="max-price col-sm form-control"
              value={priceMax}
              onChange={handleInputMax}
            />
          </div>
        </div>
      </div>
      <BestSeller bestseller={bestseller}></BestSeller>
    </div>
  );
};

export default ShopSideBar;
