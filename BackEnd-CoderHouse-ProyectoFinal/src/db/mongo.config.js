import { connect } from "mongoose";
import { MONGODB_CNX_STR } from "../config/config.js";
import { getLogger } from "../utils/logger.js";

const logger = getLogger();
export const configConnection = {

    url: MONGODB_CNX_STR,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}

const connectDB = async () => {
    try {
        await connect(configConnection.url, configConnection.options);
        logger.info("Database connected");
    } catch (error) {
        logger.info(error);
        throw new Error("Error connecting to database");
    }
}

export default connectDB;

