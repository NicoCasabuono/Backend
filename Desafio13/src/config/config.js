import { config } from 'dotenv';
config();
import { mode, port, persistence } from './command.config.js';


export const SERVER_PORT = port || process.env.SERVER_PORT

export const PERSISTENCE = persistence || process.env.PERSISTENCE

export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR
export const MONGOOSE_DB_COLLECTION_USERS = process.env.MONGOOSE_DB_COLLECTION_USERS
export const MONGOOSE_DB_COLLECTION_PRODUCTS = process.env.MONGOOSE_DB_COLLECTION_PRODUCTS
export const MONGOOSE_DB_COLLECTION_CARTS = process.env.MONGOOSE_DB_COLLECTION_CARTS
export const MONGOOSE_DB_COLLECTION_TICKETS = process.env.MONGOOSE_DB_COLLECTION_TICKETS

export const PASSPORT_GITHUB_CLIENTID = process.env.PASSPORT_GITHUB_CLIENTID
export const PASSPORT_GITHUB_CLIENTSECRET = process.env.PASSPORT_GITHUB_CLIENTSECRET
export const PASSPORT_GITHUB_CALLBACKURL = process.env.PASSPORT_GITHUB_CALLBACKURL

export const JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET
export const PASS_NODEMAILER = process.env.PASS_NODEMAILER
