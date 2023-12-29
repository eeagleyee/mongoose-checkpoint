const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
  // Add more fields as needed
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
