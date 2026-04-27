import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import connectDb from "./config/connectDB.js"

const port = process.env.PORT
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173/",
    credentials: true,
}))



app.get("/", (req, res) => {
    res.send("Hello from Server");
});

app.listen(port, () => {
    console.log("Server is Started");
    connectDb();
})