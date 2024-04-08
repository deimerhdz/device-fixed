import {config } from 'dotenv'
import {DataSource, DataSourceOptions} from 'typeorm'
import InitSeeder from './src/database/seeds/init.seeder';
import { SeederOptions } from 'typeorm-extension';
const env = process.env.NODE_ENV = 'development'
config({
    path:`.env.${env}`
})
const options={
    type:'mysql',
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    entities:['src/**/*.entity.ts'],
    migrations:['src/database/migrations/*.ts'],
    seeds: [InitSeeder]
}
export default new DataSource( options as DataSourceOptions & SeederOptions)