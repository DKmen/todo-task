import { DataSource } from "typeorm"
import { Task } from "./task.model";

const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 32768,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgrespw",
    database: process.env.DB_DATABASE || "testdb",
    synchronize: true,
    logging: false,
    entities: [Task],
    migrations: [],
    subscribers: [],
})

export default dataSource;