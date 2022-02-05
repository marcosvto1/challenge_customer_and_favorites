import { Customer } from '@/provider/database/postgree/customer/customer.entity'
import * as dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'
dotenv.config()


export const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '15432'),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [Customer]
}