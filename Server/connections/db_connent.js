import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config()



const pool = mysql2.createPool(process.env.TIDB_URL)


export default pool.promise();