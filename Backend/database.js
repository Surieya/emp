import mysql from "mysql2"
import expressAsyncHandler from 'express-async-handler'
import dotenv from "dotenv";
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();


// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error getting connection from pool:', err);
//     return;
//   }

//   console.log('Connected to MySQL server');

//   // Your queries or other database operations go here

//   // Release the connection back to the pool when done
//   connection.release();
// });

export async function run() {
    let connection;

    try {
        connection = await pool.getConnection();

        console.log('Connected to MySQL server');

        // Your queries or other database operations go here

    } catch (err) {
        console.error('Error getting connection from pool:', err);
    } finally {
        if (connection) {
            // Release the connection back to the pool when done
            connection.release();
        }
    }
}

function asyncHandler(fn) {
    return async (req,res,next) => {
        try {
            await fn(req,res,next);
        } catch (err) {
            next(err)
        }
    }
}
// export async function createUser() {
    
// }

const createUser = expressAsyncHandler(async (req,res,next) => {
    const { firstName, lastName, age, dateOfBirth } = req.body;
    const result = await pool.query('INSERT INTO employees(firstName,LastName,age,dateOfBirth) VALUES (?,?,?,?)', [firstName, lastName, age, dateOfBirth]);

    res.status(201)
    // console.log({result})
    return res.status(201).json({
        data:result
    })

    

})

const updateUser = expressAsyncHandler(async (req,res,next) => {
    
})

const getAllUsers = expressAsyncHandler(async (req, res,next) => {
    const [rows] = await pool.query("SELECT * FROM employees");
    console.log(rows);

    return res.status(200).json({
        data: rows
    })

})

const getSingleUser = expressAsyncHandler(async (req,res,next) => {
    // const { id } = req.id;
    const { id } = req.params;
    const statusCode = res.statusCode || 200;
    const result = await pool.query('SELECT * FROM employees WHERE id=?', [id]);
    console.log(result);
    return res.status(statusCode).json({
        data:result
    })
})

export {
    createUser,
    updateUser,
    getAllUsers,
    getSingleUser
}