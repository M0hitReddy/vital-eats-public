import foodModel from "../models/foodModel.js";
import fs from "fs";
// import reviewModel from "../models/reviewModel.js";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file?.filename ?? ""}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    calories: req.body.calories,
    dietary: req.body.dietary,
  });
  try {
    console.log(food);
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// get food item by id
const getFoodById = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.itemId);
    console.log(food);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood, getFoodById };

// export { addFood, listFood, removeFood, getFoodById, submitReview };

// export { addFood, listFood, removeFood, getFoodById };
