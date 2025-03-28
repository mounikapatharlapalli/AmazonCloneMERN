import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Sample product data (no API required)
const productData = [
  {
    product_id: 1,
    name: "Yoga Mat",
    images: "https://m.media-amazon.com/images/I/51VuwOmpbML._AC_UL480_FMwebp_QL65_.jpg", // Replace with actual image
    rating: 4.5,
    ratings: 120,
    price: 799,
    cutoff_price: 999,
    discount: 20,
  },
  {
    product_id: 2,
    name: "Meditation Cushion",
    images: "https://m.media-amazon.com/images/I/81sn6zKK8WL._AC_UL480_FMwebp_QL65_.jpg",
    rating: 4.2,
    ratings: 85,
    price: 499,
    cutoff_price: 699,
    discount: 29,
  },
  {
    product_id: 3,
    name: "Essential Oil Diffuser",
    images: "https://m.media-amazon.com/images/I/31IQb9txInL.jpg",
    rating: 4.7,
    ratings: 200,
    price: 1599,
    cutoff_price: 1999,
    discount: 20,
  },
  {
    product_id: 4,
    name: "Yoga Blocks (Set of 2)",
    images: "https://m.media-amazon.com/images/I/710FCC6cvVL._AC_UL480_FMwebp_QL65_.jpg",
    rating: 4.3,
    ratings: 95,
    price: 899,
    cutoff_price: 1199,
    discount: 25,
  },
];

const Products = () => {
  const [products] = useState(productData);
  const [favorites, setFavorites] = useState({});

  const addToCart = (product) => {
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = existingCart.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Product added to cart!");
  };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  return (
    <div className="container">
      {products.length > 0 ? (
        <div className="d-flex flex-wrap">
          {products.map((product) => (
            <div key={product.product_id} className="col-3 mb-3 p-2">
              <div className="innerbox shadow border p-2">
                <div
                  onClick={() => toggleFavorite(product.product_id)}
                  style={{ cursor: "pointer" }}
                >
                  {favorites[product.product_id] ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderOutlinedIcon />
                  )}
                </div>
                <img src={product.images} alt={product.name} className="w-100" />
                <h5>{product.name}</h5>
                <Rating name="half-rating" readOnly value={product.rating} precision={0.5} />
                <p>{product.ratings} ratings</p>
                <h6>Rs. {product.price}</h6>
                <p>
                  MRP: <del>{product.cutoff_price}</del>
                </p>
                <h6>({product.discount}% off)</h6>
                <div className="d-flex justify-content-between">
                  <Link to={`/productsdetails/${product.product_id}`}>
                    <button className="btn btn-info">View Details</button>
                  </Link>
                  <button className="btn btn-warning" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Products Available</p>
      )}
    </div>
  );
};

export default Products;
