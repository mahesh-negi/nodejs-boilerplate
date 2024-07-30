import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';

// Load environment variables from .env file
dotenv.config();

logger.info("Connecting Database...");

if (process.env.DATABASE_CONNECTIONURL) {
    mongoose.connect(process.env.DATABASE_CONNECTIONURL).catch((e) => {
        logger.error("Failed to Connect to Database", { stack: e });
    });
} else {
    logger.error("DATABASE_CONNECTIONURL is not defined in .env file");
}

const database = mongoose.connection;

database.on("error", (e) => {
    logger.error("Failed to connect to Database", { stack: e });
});

database.on("connected", () => {
    logger.info("Database has been Connected");
});

export default database;