import dotenv from "dotenv";

dotenv.config()

export const {
    NODE_ENV,
    PORT,
    API_VERSION,
    MONGODB_CNX_STR,
    SECRET_CODE_JWT,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    PERSISTENCE,
    EMAIL,
    PSW_EMAIL,
    SMS_ACC_SID,
    SMS_AUTH_TOKEN,
    PHONE,
    BASE_API_URL,
} = process.env;