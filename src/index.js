const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();


mongoose.connect('mongodb://paulovitor2123:paulada.flamengo@cluster0-shard-00-00-jkja4.mongodb.net:27017,cluster0-shard-00-01-jkja4.mongodb.net:27017,cluster0-shard-00-02-jkja4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);