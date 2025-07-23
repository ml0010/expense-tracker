const express = require("express");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Successfully connected to MongoDB")).catch((error)=>console.log("Couldn't connect to MongoDB", error));

const expenseSchema = new mongoose.Schema({
    userId: String,
    date: Date,
    description: String,
    amount: Number,
    category: String
});

const Expenses = mongoose.model("Expenses", expenseSchema);


app.get("/", async(req, res) => {
    res.json("SERVER CONNECTED");
});

app.post("/", async(req, res) => {
    try {
        let expense = new Expenses(req.body);
        let result = await expense.save();
        res.json(expense);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get("/expense-records/:userId", async(req, res) => {
    try {
        const userId = req.params.userId;
        const records = await Expenses.find({userId : userId});
        if (records.length === 0) {
            return res.status(400).send("No records found for this user");
        }
        res.status(200).send(records);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const newRecord = await Expenses.findByIdAndUpdate(
            id,
            newRecordBody,
            {new: true}
        );
        if (!newRecord) {
            return res.status(400).send("No record found");
        }
        res.status(200).send(newRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const record = await Expenses.findByIdAndDelete(id);
        if (!record) {
            return res.status(400).send("No record found");
        }
        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3001, () => {
    console.log(`Console is running on port 3001`);
})