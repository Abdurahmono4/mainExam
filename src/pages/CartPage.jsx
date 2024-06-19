import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementProduct,
  decrementProduct,
  removeProduct,
  calculateTotal,
} from "../features/productsSlice";

function CartPage() {
  const products = useSelector((state) => state.products.products);
  const totalAmount = useSelector((state) => state.products.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [products, dispatch]);

  const handleIncrement = (id) => {
    dispatch(incrementProduct(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementProduct(id));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="container-class mx-auto mt-10 pb-10">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      <div className="cart-items">
        {products.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow"
                >
                  <div className="card-body card">
                    <figure>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlmiKYctKUVaYQs4EExOC7LqREBxfMy4eC0Q&s"
                        alt=""
                        className="w-full h-32 sm:h-48 object-cover"
                      />
                    </figure>
                    <div className="flex justify-between">
                      <span>{product.name}</span>
                      <span>Piece: {product.amount}</span>
                    </div>
                    <span className="font-bold text-lg">{product.name}</span>
                    <span className="text-info">
                      Subtotal: ${product.amount * product.price}
                    </span>
                    <div className="card-actions">
                      <button
                        onClick={() => handleIncrement(product.id)}
                        className="btn btn-primary"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleDecrement(product.id)}
                        className="btn btn-secondary"
                        disabled={product.amount <= 1}
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Total Amount: ${totalAmount}</h2>
      </div>
    </div>
  );
}

export default CartPage;
