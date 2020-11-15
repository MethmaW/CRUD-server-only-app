const mongoose = require("mongoose");
const dotenv = require("dotenv");

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();

//connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


//checking the connection status of the database
let db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
})

db.once('open', () => {
  console.log("Successfully connected to the database");
})

//create the schema
const crudSchema = new mongoose.Schema({
  name: String,
  age: Number,
  marks: Number,
});

//create the model(collection)
const Crud = mongoose.model("Crud", crudSchema);

//typing a record manually
const crudRecordOne = new Crud({
  name: "Methma",
  age: 21,
});


//CREATING the manually typed record in the base
// Crud.create(crudRecordOne, (err) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log("sccessfully added to the database");
//   }
// })



//CREATING many records - insertMany method also can be used but create is the mongoose prefered method
// Crud.create([
//   {
//     name: "methma",
//     age: 20,
//     marks: 85
//   },
//   {
//     name: "John",
//     age: 35,
//     marks: 70
//   }
// ], (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("sucessfully added all the records");
//   }
// })



//CREATING one record
// Crud.create({
//   name: "kate",
//   age: 28,
//   marks: 45
// }, (err) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log("successfully added the record");
//   }
// })



// CREATING the records using user inputs - server based no GUI
// rl.question("Name: ", (userName) => {
//   rl.question("age: ", (userAge) => {
//     rl.question("Marks: ", (userMarks) => {
//       const crudReadlineRecord = new Crud({
//         name: userName,
//         age: userAge,
//         marks: userMarks,
//       });



//       Crud.insertMany(crudReadlineRecord, (err) => {
//         if (err) {
//           console.error("Failed there was an error" + err);
//         } else {
//           console.log("Sccessfully added the record to the database");
//         }
//       });
//     });
//   });
// });



//READING - find all the records in the database
// Crud.find({}, (err, crudRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudRecords);
//   }
// })



//READING - find all the records that are equal to the given field value
// Crud.find({age: 21}, (err, crudFilterAllRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudFilterAllRecords);
//   }
// })



//READING - find the record where the name is equal to methma
// Crud.findOne({name: "methma"}, (err, crudFilterRecord) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log(crudFilterRecord.marks);
//   }
// })



//READING - sorting the database asc order
// Crud.find({}, (err, crudRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudRecords);
//   }
// }).sort({marks: 1})



//READING - sorting the database dsc order
// Crud.find({}, (err, crudRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudRecords);
//   }
// }).sort({marks: -1})



//READING - counting the documents in the databse
// Crud.find({}, (err, crudCountRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudCountRecords);
//   }
// }).countDocuments()



//READING - counting the documents in the databse
// Crud.find({age: 21}, (err, crudCountOneRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudCountOneRecords);
//   }
// }).countDocuments()



// READING - forEach 
// Crud.find({}, (err, crudRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     crudRecords.forEach((records) => {
//     console.log("Hello " + records.name + ", your marks: " + records.marks);
//     })
//   }
// })



//READING - find all the records in the database and limit it to the given value
// Crud.find({}, (err, crudRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudRecords);
//   }
// }).limit(2)



//READING - find all the records in the database and limit and sort
// Crud.find({}, (err, crudRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudRecords);
//   }
// }).sort({marks: -1}).limit(2)



//READING - find only the id and the marks of all the records
// Crud.find({}, {_id: 1, marks: 1  }, (err, crudRecords) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(crudRecords);
//   }
// })



//UPDATING one record, when upsert is true it creates a new record if the document not in the database already
// Crud.updateOne({name: "test"}, {
//   name: "methma",
// }, { upsert: true}, (err) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log("successfully updated");
//   }
// })



//UPDATING one record, this method also can be used
// Crud.updateOne({ name: 'methma' },
// {
//   $set: {
//     marks: 99,
//     age: 30
//   }
// }, (err) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log("successfully updated");
//   }
// })



//UPDATING - increment field , add 5 to marks value
// Crud.updateOne({ name: 'methma' },
// {
//   $inc: {
//     marks: 5
//   }
// }, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("successfully updated");
//   }
// })



//UPDATING - rename a field name
// Crud.updateOne({ name: 'methma' },
// {
//   $rename: {
//     marks: 'points'
//   }
// }, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("successfully updated");
//     }
// })



//UPDATING many records, changes the marks value of all the records to 20 
// Crud.updateMany({}, {marks: 20}, (err) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log("successfully updated");
//   }
// })



//DELETING - a specific record
// Crud.deleteOne({ name: 'sam' }, (err) => {
//     if(err) {
//       console.error(err);
//     } else {
//       console.log("successfully deleted");
//     }
// });



//DELETING - delete many records
// Crud.deleteMany({ name: 'john' }, (err) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log("successfully deleted");
//   }
// });




//DELETING all the records in the database
// Crud.deleteMany({ }, (err) => {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log("successfully deleted");
//   }
// });