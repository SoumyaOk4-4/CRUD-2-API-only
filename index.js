const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phno: String
});

const userModel = mongoose.model("user", userSchema);


app.get("/", async (req, res) => {
    const userData = await userModel.find({});
    res.send({ message: "Fetched", success: true, data: userData });
});

app.post("/", async (req, res) => {
    const userData = await userModel.create(req.body);
    res.send({ message: "Created", success: true, data: userData });
});

app.put("/", async (req, res) => {
    const { _id, ...rest } = req.body;
    const userData = await userModel.updateOne({ _id: _id }, rest);
    res.send({ message: "Update", success: true, data: userData });
});

app.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    const userData = await userModel.deleteOne({ _id: _id });
    res.send({ message: "Deleted", success: true, data: userData });
});


mongoose.connect(mongoUrl).then(() => {
    console.log('db connected');
    app.listen(port, () => {
        console.log(`running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.log(err);
});
