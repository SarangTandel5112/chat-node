import App from './server';
import * as http from 'http';
import { DataSource } from "typeorm";
import { AppDataSource } from './db/db.config';
import { AppSocket } from './socket/socket';
import { Redis } from './helpers/redis';

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(App);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        // new Redis()
        // const appSocket = new AppSocket();
        // appSocket.init();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


httpServer.listen(PORT, () => {
    console.log(`Server started at ${PORT}.....`)
});
