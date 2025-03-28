import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCartStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.product_id !== id);
    updateCartStorage(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartStorage(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.product_id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartStorage(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div className="card mb-3 shadow-sm" key={item.product_id}>
              <div className="card-body d-flex align-items-center">
                <img src={item.images} alt={item.name} width="100" className="me-3 rounded" />
                <div className="flex-grow-1">
                  <h5>{item.name}</h5>
                  <p className="text-muted">Rs. {item.price} x {item.quantity}</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => decreaseQuantity(item.product_id)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => increaseQuantity(item.product_id)}>+</button>
                  </div>
                </div>
                <button className="btn btn-danger ms-3" onClick={() => removeFromCart(item.product_id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="text-end">
            <h4 className="fw-bold">Total: Rs. {calculateTotal()}</h4>
            <button className="btn btn-primary mt-3">Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <p className="text-muted">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
