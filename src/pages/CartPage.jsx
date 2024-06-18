import { useState } from "react";
import { useSelector } from "react-redux";

function CartPage() {
  const [recipe, setRecipe] = useState([]);
  const products = useSelector((state) => state.products.products);
  const [sum, setSum] = useState(0);
  const totalAmount = useSelector((state) => state.products.totalAmount);
  function calculateSum() {
    let summa = 0;
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        summa += products[i].amount * products[i].price;
      }
    }
    setSum(summa);
  }
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
                      <span>Piece:{product.amount} </span>
                    </div>
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
