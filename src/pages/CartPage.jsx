import { useState } from "react";

import { useSelector } from "react-redux";

function CartPage() {
  const products = useSelector((state) => state.products.products);
  const [sum, setSum] = useState(0);
  const totalAmount = useSelector((state) => state.products.totalAmount);

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
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow"
                >
                  <div className="card-body">
                    <span className="font-bold text-lg">
                      {products.length} Items
                    </span>
                    <span className="text-info">Subtotal: ${sum}</span>
                    <div className="card-actions">
                      <span className="cart-count">{totalAmount}</span>
                    </div>
                  </div>
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
