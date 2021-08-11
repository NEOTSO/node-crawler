import express from 'express';
import cookieSession from 'cookie-session';
import router from './router'

import "./controller/CrawlerController"

const app = express()

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(
    cookieSession({
        name: 'session',
        keys: ['node-crawler'],
        maxAge: 24 * 60 * 60 * 1000
    })
);

app.use(router)

app.listen(3012, () => {
    console.log('server is running');
});
