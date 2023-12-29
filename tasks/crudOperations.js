// Create a record
const createPerson = () => {
  const newPerson = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  });

  newPerson.save((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("New person added:", data);
    }
  });
};

// Create many records
const createManyPeople = () => {
  const arrayOfPeople = [
    { name: "Alice", age: 25, favoriteFoods: ["Sushi", "Pasta"] },
    { name: "Bob", age: 28, favoriteFoods: ["Steak", "Burritos"] },
    { name: "Kate", age: 22, favoriteFoods: ["Bread", "Beans"] },
    { name: "Ron", age: 27, favoriteFoods: ["Burritos", "Yam"] },
    { name: "Ken", age: 29, favoriteFoods: ["Crunches", "Egg"] },
    { name: "Joy", age: 26, favoriteFoods: ["Steak", "Burritos"] },
    { name: "Jule", age: 25, favoriteFoods: ["Fish", "Meat"] },
  ];

  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Multiple people added:", data);
    }
  });
};

// Find people by name
const findPeople = (name, callback) => {
  Person.find({ name }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`People with name "${name}":`, data);
    }
  });
};

// Find one person with a certain food in favorites
const findOnePersonByFood = (food, callback) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Person who likes ${food}:`, data);
    }
  });
};

// Find a person by _id
const findPersonById = (personId, callback) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Person by ID:", data);
    }
  });
};

// Update a record by _id (find, edit, then save)
const updatePersonFavoriteFood = (personId, callback) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      console.error(err);
    } else {
      person.favoriteFoods.push("hamburger");
      person.save(callback);
    }
  });
};

// Update a person's age by name
const updatePersonAgeByName = (personName, callback) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Updated Person:", updatedPerson);
      }
    }
  );
};

// Delete a record by _id
const deletePersonById = (personId, callback) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Deleted Person:", deletedPerson);
    }
  });
};

// Delete all people whose name is "Mary"
const deletePeopleByName = (name, callback) => {
  Person.remove({ name }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Number of people deleted:", result.deletedCount);
    }
  });
};

// Find people who like burritos, sort by name, limit results to two, hide their age
const findBurritoLovers = (callback) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 }) // Ascending order by name
    .limit(2)
    .select("-age") // Excluding the age field
    .exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log("People who like burritos:", data);
      }
    });
};

module.exports = {
  createPerson,
  createManyPeople,
  findPeople,
  findOnePersonByFood,
  findPersonById,
  updatePersonFavoriteFood,
  updatePersonAgeByName,
  deletePersonById,
  deletePeopleByName,
  findBurritoLovers,
};
