import express from "express";
import cors from "cors";
import {
    auditLogRouter,
    authRouter,
    habitRouter,
    habitLogRouter,
    levelThresholdRouter,
    userRouter,
    xpTransactionRouter,
    achievementRouter,
    tipRouter,
    badgeTierRouter,
    userAchievementRouter,
    userAvatarRouter,
    feedRouter
} from './routes/index.js';
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from 'body-parser';

const middlewares = (app) => {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

const establishRoutes = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/habits', habitRouter);
    app.use('/api/habitlogs', habitLogRouter);
    app.use('/api/xp', xpTransactionRouter);
    app.use('/api/levels', levelThresholdRouter);
    app.use('/api/auditlogs', auditLogRouter);
    app.use('/api/achievements', achievementRouter);
    app.use('/api/tips', tipRouter);
    app.use('/api/badgetiers', badgeTierRouter);
    app.use('/api/user-achievements', userAchievementRouter);
    app.use('/api/user-avatars', userAvatarRouter);
    app.use('/api/feed', feedRouter);
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