import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { db } from "../firebase/firebaseConfig"; // Firebase configuration import
import { collection, addDoc } from "firebase/firestore"; // Firestore methods import

function Create() {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [image, setImage] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState("");

  const addIngredient = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      if (!ingredients.includes(ingredient.trim())) {
        setIngredients((prev) => [...prev, ingredient.trim()]);
        toast.success("Ingredient added successfully");
      } else {
        toast.error("Ingredient already exists");
      }
    } else {
      toast.error("Ingredient cannot be empty");
    }
    setIngredient("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !method ||
      !image ||
      !cookingTime ||
      ingredients.length === 0 ||
      !categories
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const newRecipe = {
      title,
      method,
      image,
      cookingTime: `${cookingTime} minutes`,
      ingredients,
      categories,
    };

    try {
      await addDoc(collection(db, "recipes"), newRecipe);
      toast.success("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error adding recipe: " + error.message);
    }
  };

  return (
    <div className="cardAdd mx-auto mt-20 w-full max-w-2xl p-4 md:w-2/3 lg:w-1/2">
      <h1 className="text-2xl text-center font-bold mb-6">Create New Recipe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            <p className="break-words">
              Ingredients:{" "}
              {ingredients.map((ing, index) => (
                <span className="inline-block mr-2" key={index}>
                  {ing}
                </span>
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
            className="input input-bordered h-15 w-full"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image URL:</span>
          </div>
          <input
            type="url"
            placeholder="Type here"
            className="input input-bordered w-full"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            className="select w-full"
            onChange={(e) => setCategories(e.target.value)}
            value={categories}
          >
            <option value="">Select a category</option>
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
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Describe the method"
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
