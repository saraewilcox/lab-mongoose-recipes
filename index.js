const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
//HAD TO REMOVE 27017 FOR THE DB TO CONNECT TO MONGO
const MONGODB_URI = 'mongodb://localhost/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
//Iteration 2:
  Recipe.create({
    title: 'Chicken noodle soup',
    cuisine: 'soup' 
      }).then((title) => {
      console.log(`The recipe is saved and its title is: ${title}`) 

    //Iteration 3:
    Recipe.insertMany(data)
    .then(recipes => {
      console.log('The recipes are saved and titles are:');
      recipes.forEach(recipe => console.log (recipe.title));
      
      //Iteration 4:
      Recipe.updateOne({title: 'Rigatoni alla Genovese'}, { duration: 100})
        .then((updatedOne) => {
          console.log(`Recipe duration got updated to ${updatedOne}`);
          
          //Iteration 5:
          Recipe.deleteOne({title: 'Carrot Cake'})
            .then((resultFromDeleteOne) => {
              console.log(`One recipe got deleted ${resultFromDeleteOne}`);
            
              }).catch((err) => {
              console.error('Error occurred on delete one ', err);

            }).finally(() => {
              mongoose.connection.close()
            });
          }).catch((err) => {
        console.log('error occured on update one ', err);
      })
    })
  })
})

  /*

  let promiseInsertMany = Recipe.insertMany(data);
  let promiseUpdateOne = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, { duration: 100});
  let promiseDeleteOne = Recipe.deleteOne({title: 'Carrot Cake'});

Promise.all([
  promiseInsertMany,
  promiseInsertMany,
  promiseDeleteOne
]).then(() => {
  console.log('all operations done');
}).catch((err) => {
  console.log('error occured');
}).finally(() => {
  mongoose.connection.close()
});*/