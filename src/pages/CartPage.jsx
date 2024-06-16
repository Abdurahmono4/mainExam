import React from "react";
import { useSelector } from "react-redux";

function CartPage() {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="container-class mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      <div className="cart-items">
        {products.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span>{product.amount}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CartPage;
