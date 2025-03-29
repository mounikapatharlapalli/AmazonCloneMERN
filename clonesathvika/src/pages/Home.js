import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom'; // Fixed import
import Skeleton from '@mui/material/Skeleton';
import Checklogin from './Checklogin';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Home = () => {
  const [loggedin, setLoggedin] = useState(Checklogin());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchData = async () => {
    try {
      const data = new FormData();
      const response = await axios.post(
        "https://amazon.indianhackerslab.com/get-products.php",
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }, // Fixed `header` to `headers`
        }
      );
      
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        console.error("No products received from API.");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none"></a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li>
          <li><a href="#" className="nav-link px-2">Features</a></li>
          <li><a href="#" className="nav-link px-2">Pricing</a></li>
          <li><a href="#" className="nav-link px-2">FAQs</a></li>
          <li><a href="#" className="nav-link px-2">About</a></li>
        </ul>

        {loggedin ? (
          <div>
            <Link to="/account" className="btn btn-outline-primary me-2">Accounts</Link>
          </div>
        ) : (
          <div className="col-md-3 text-end">
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign-up</Link>
          </div>
        )}
      </header>

      <div className="container">
        <div className="d-flex flex-wrap">
          {!loading && products.length > 0 ? (
            products.map((product) => (
              <div key={product.product_id} className="col-3 mb-3 p-2">
                <div className="innerbox shadow border p-2">
                  <FavoriteBorderOutlinedIcon />
                  <img src={product.images} className="w-100" alt={product.name} />
                  <h5>{product.name}</h5>
                  <Rating name="half-rating" readOnly defaultValue={product.rating} precision={0.5} />
                  <p>{product.ratings}</p>
                  <h6>Rs. {product.price}</h6>
                  <p>MRP: <del>{product.cutoff_price}</del></p>
                  <h6>({product.discount}% off)</h6>
                  <div className="d-flex justify-content-between">
                    <Link to={`/productsdetails/${product.product_id}`}>
                      <button className="btn btn-info">View Details</button>
                    </Link>
                    <button className="btn btn-warning">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            loading ? (
              <div className='d-flex flex-wrap container'>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className='col-3 shadow mb-4 p-3'>
                    <Skeleton variant="rectangular" width={300} height={300} />
                  </div>
                ))}
              </div>
            ) : (
              <p>No Products Available</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
