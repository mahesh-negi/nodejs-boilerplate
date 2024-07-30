import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './utils/database';
import http from 'http';
import routes from './routes';
import { AdminSeeder } from "../src/db/seeds/user"
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());

const server: http.Server = http.createServer(app);

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

database.once('open', () => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});

AdminSeeder();

database.on('error', (error) => {
    console.error('Error connecting to database', error);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});
