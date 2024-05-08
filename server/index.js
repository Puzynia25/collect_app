import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB is OK!"))
    .catch((e) => console.log("DB error", e));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("YES!");
});

app.post("/auth/login", (req, res) => {
    console.log(req.body);
    const token = jwt.sign(
        {
            email: req.body.email,
            fullName: "Vitalina Puzynia",
        },
        "secret04"
    );
    res.json({ message: "POST is OK!", token });
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("ALL RIGHTY!");
});
