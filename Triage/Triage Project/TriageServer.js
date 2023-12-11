// Import necessary resources to operate the server
import express from "express";
import { getDoctor } from './database.js';

const APP = express();
const PORT = 8080;

// Make this node app reference static files via the public domain
APP.use(express.static("public"));

// Make program JSON compatible
APP.use(express.json());


APP.get("/", async (req, res) => { 
    res.json(await getDoctor().rows);
});

APP.post("/add-patient", async (req, res) => {
    const { name, healthcardNumber, healthcardVersion } = req.body;
    await addPatient(name, healthcardNumber, healthcardVersion);
});

APP.listen(PORT, () => { console.log("Server listening on port " + PORT); });
