// Define server properties and import required resources
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Create a MySQL connection on localhost
const POOL = mysql.createPool({
    host : '127.0.0.1',                 // Current host IP
    user : 'triageuser',           // MySQL user
    password : 'TR1@GE_US3R',   // Database Password
    database : 'triage_schema'       // Database name
}).promise();

async function query(queryLine) { return await POOL.query(queryLine)[0]; }
async function insert(insertionLine) { return await POOL.query(insertionLine)[0]; }

export async function getUsers() {  
    var result = await POOL.query("SELECT * FROM tblPatient;");
    //result += await POOL.query("SELECT * FROM tblDoctor");
    console.log(result);
    return  result;
}

export async function getDoctor(username, password) { 
    return await POOL.query("SELECT * FROM tblDoctor;" +
                            "WHERE name LIKE ? AND password LIKE ?", ["'" + username + "'", "'" + password + "'"]);
}

async function createRecord() {
    
}