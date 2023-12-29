const connectDB = require("./db");
const Person = require("./model/person"); // Import your Person model
const {
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
} = require("./tasks/crudOperations");

// Load environment variables from .env file
require("dotenv").config();

const DB_URL = process.env.DB_URL;

async function startDB() {
  try {
    await connectDB(); // Wait for the database connection
    const connected = await connectDB(DB_URL);
    if (connected) {
      console.log("Database Connected");

      await Person.deleteMany({});

      await createPerson();
      await createManyPeople();
      await findPeople("Mary");
      await findOnePersonByFood("Guacamole");

      const persons = await Person.find();
      await findPersonById(persons[0]._id.toString());

      await updatePersonFavoriteFood(persons[5]._id.toString());
      await updatePersonAgeByName("Davis");

      const removed = await deletePersonById(persons[5]._id.toString());
      await deletePeopleByName("Mary");

      await findBurritoLovers();
    }
  } catch (error) {
    console.error("Error in startDB:", error);
  }
}

startDB();
