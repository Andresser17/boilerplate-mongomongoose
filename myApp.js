require("dotenv").config();
const mongoose = require("mongoose");

// Database Connection
const db = async () =>
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

db().catch((err) => console.log(err));

// Declared Schemas
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Declared Models
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Carlos",
    age: 20,
    favoriteFoods: ["Hallaca", "Ice Cream", "Burguer", "Cachapa", "Tequeños"],
  });

  person.save((err, data) => {
    if (err) return done(err);

    done(null, data);
  });
};
// createAndSavePerson((err, data) => console.log(err, data))

const createManyPeople = (arrayOfPeople, done) => {
  Person.insertMany(arrayOfPeople, (err, data) => {
    if (err) return done(err);

    done(null, data);
  });
};

const findPeopleByName = async (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);

    done(null, data);
  });
};
// findPeopleByName("Alejandro", (err, data) => console.log(err, data))

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);

    done(null, data);
  });
};
// findOneByFood("Hallaca", (err, data) => console.log(err, data))

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err);

    done(null, data);
  });
};
// findPersonById("61ba8ad1de9596108feaa0b8", (err, data) => console.log(err, data))

const findEditThenSave = (personId, done) => {
  findPersonById(personId, (err, data) => {
    data.favoriteFoods.push("hamburger");

    data.save((err, data) => {
      if (err) return done(err);

      done(null, data);
    });
  });
};
// findEditThenSave("61ba8ad1de9596108feaa0b8", (err, data) =>
// findPeopleByName("Alejandro", (err, data) => console.log(err, data));
// );

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return data(err);

      done(null, data);
    }
  );
};
// findAndUpdate("Alejandro", (err, data) => console.log(err, data));

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, data) => {
    if (err) return data(err);

    done(null, data);
  });
};
// removeById("61ba8aefc580e010b3476e51", (err, data) => console.log(err, data));

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) return data(err);

    done(null, data);
  });
};
// removeManyPeople((err, data) => console.log(err, data))

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const chain = Person.find({ favoriteFoods: foodToSearch })
    .sort({
      name: "asc",
    })
    .limit(2)
    .select("-age");

  // Execute query
  chain.exec((err, data) => {
    if (err) return done(err);

    done(null, data);
  });
};
// queryChain((err, data) => console.log(err, data));

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
