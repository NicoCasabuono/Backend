import { connect } from 'mongoose'

import { MONGODB_CNX_STR} from './config.js'

export const connectMongo = async () => await connect(MONGODB_CNX_STR)
