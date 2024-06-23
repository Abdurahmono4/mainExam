import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseAmount,
  decreaseAmount,
  removeProduct,
  calculateTotal,
} from "../features/productSlice";

function CartPage() {
  const products = useSelector((state) => state.products.products);
  const totalPrice = useSelector((state) => state.products.price);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal()); // Calculate total price on component mount
  }, [products, dispatch]);

  const handleIncrement = (id) => {
    dispatch(increaseAmount(id));
  };

  const handleDecrement = (id) => {
    dispatch(decreaseAmount(id));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }, [products]);

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
                        src={product.image} // Ensure image URL is dynamic
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
                        disabled={product.amount <= 0}
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
        <h2 className="text-xl font-bold">Total Amount: ${totalPrice}</h2>
      </div>
    </div>
  );
}

export default CartPage;
