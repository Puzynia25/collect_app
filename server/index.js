require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 9000;

const app = express();
const corsOptions = {
    origin: ["https://collect-app.onrender.com", "https://collect-app-client.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log("Request Headers:", req.headers);
    next();
});

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log("ALL RIGHTY!"));
    } catch (e) {
        console.log(e);
    }
};
start();
