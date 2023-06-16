
import { MongoClient } from 'mongodb' ; //import "MongoClient" from 'mongodb' package
import mysql from 'mysql2/promise' ; //import "mysql" from 'mysql/promise' package
import {mongoURI, mysqlConnect} from './secrets.js'; //import variables "mongoURI" and "mysqlConnect" from the './secrets.js' file.

const db1 = await mysql.createConnection(mysqlConnect) // I use the mysql.createConnection() method from the 'mysql2/promise' package to establish a connection to the MySQL database. Since we are using the promise-based version of the package, we can use await to wait for the connection to be established. The resulting connection object is stored in the db1 variable.

const [movieList] = await db1.execute("select * from movies") // I use the db1.execute() method to execute a SQL query to fetch data from the 'movies' table. Since we're using the promise-based version of the 'mysql2' package, we can use await to wait for the query execution. The result is stored in the movieList variable, which is an array destructured from the result array.

db1.end() // Closes the MySQL connection

const Connection = new MongoClient (mongoURI) // I create a new instance of MongoClient by passing the mongoURI connection string. 
await Connection.connect() // I use await to wait for the connection to MongoDB to be established. The resulting Connection object allows us to access the MongoDB databases.
const db2 = Connection.db('Cluster0') // I use the Connection.db() method to select a specific database ('Cluster0') and store it in the db2 variable.

    await db2.collection ("movies") // I use the db2.collection("movies") statement, we select the "movies" collection within the 'Cluster0' database.
    .insertMany(movieList) // Then, we use the insertMany() method to insert the movieList array, which contains the data fetched from the MySQL database, into the MongoDB collection.
// We use await to ensure that the insertion operation is completed before moving on to the next step.
    
Connection.close() // Close the MongoDB connection.