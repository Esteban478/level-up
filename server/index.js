import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import "dotenv/config";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/auth.js";

const middlewares = (app) => {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(cors());
};

const establishRoutes = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    // Add other routes here, using authMiddleware where needed
    // app.use('/api/habits', authMiddleware, habitRouter);
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Endpoint not found. Typo somewhere maybe?' });
    });
};

const connectAndStart = (app) => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connection to database established successfully");
            const port = process.env.PORT || 5001;
            app.listen(port, () => {
                console.log("Server is running on port " + port);
                console.log("http://localhost:" + port);
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

(function () {
    const app = express();
    middlewares(app);
    establishRoutes(app);
    connectAndStart(app);
})();