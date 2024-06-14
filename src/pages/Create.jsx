import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Create() {
  const [newRecipe, setNewRecipe] = useState({});
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [image, setImage] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  const addIngredient = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      if (!ingredients.includes(ingredient) && ingredient.trim() !== "") {
        setIngredients((prev) => [...prev, ingredient]);
        toast.success("This Item is added successfully");
      } else {
        toast.error("Ingredient already exists");
      }
    } else {
      toast.error("Ingredient cannot be empty");
    }
    setIngredient("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipe = {
      title,
      method,
      image,
      cookingTime: `${cookingTime} minutes`,
      ingredients,
      categories,
    };

    setNewRecipe(recipe);
    console.log(recipe);
  };

  return (
    <div className="cardAdd mx-auto mt-20 w-full max-w-lg p-4 shadow-lg rounded-lg">
      <h1 className="text-2xl text-center font-bold mb-6">Create New Recipe</h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-3"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full h-15"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Ingredients:</span>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full h-15"
              onChange={(e) => setIngredient(e.target.value)}
              value={ingredient}
            />
            <button className="btn btn-primary" onClick={addIngredient}>
              Add
            </button>
          </div>
          <div className="mt-1">
            <p>
              Ingredients:{" "}
              {ingredients.map((ing) => (
                <span key={ing}>{ing}, </span>
              ))}
            </p>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Cooking Time</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full h-15"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image:</span>
          </div>
          <input
            type="url"
            placeholder="Type here"
            className="input input-bordered w-full h-15"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            name="category"
            id="category"
            className="select select-bordered w-full"
            onChange={(e) => setCategories([e.target.value])}
            value={categories[0] || ""}
          >
            <option value="">Select category</option>
            <option value="Milliy taomlar">Milliy taomlar</option>
            <option value="Turk taomlari">Turk taomlari</option>
            <option value="Fastfood">Fastfood</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Method</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="Method"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          ></textarea>
        </label>
        <button type="submit" className="btn btn-secondary w-full mt-4 mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
