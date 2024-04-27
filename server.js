const express = require('express');
const next = require('next');
const mongoose = require('mongoose');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const schema = require('./server/schema');
const resolvers = require('./server/resolvers');
var { createHandler } = require("graphql-http/lib/use/express")

mongoose.connect(process.env.MONGO_URI).then(() => {
    require('./server/models/allModels');
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.prepare().then(() => {
    const server = express();

    server.all(
        "/graphql",
        createHandler({
            schema: schema,
            rootValue: resolvers,
            context: req => (req)
        })
    )

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
