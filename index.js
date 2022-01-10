'use strict';
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

const { port, host, storage } = require('./serverConfig.json');

const DataStorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer));
const dataStorage = new DataStorage();

const server = http.createServer(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const menuPath = path.join(__dirname, 'menu.html');

app.get('/', (req, res) => res.sendFile(menuPath));
app.get('/all', (req, res) => dataStorage.getAll()
    .then(data => res.render('allCars', { result: data })))
app.get('/getcar', (req, res) => res.render('getcar', {
    title: 'Get-Garage',
    header: 'Get one car',
    action: '/getcar'
}))
app.post('/getcar', (req, res) => {
    if (!req.body) res.sendStatus(500);
    const productNumber = req.body.productNumber;
    dataStorage.getOne(productNumber)
        .then(car => res.render('carPage', { result: car }))
        .catch(error => sendErrorPage(res, error));
});
app.get('/removecar', (req, res) => res.render('getcar', {
    title: 'Remove',
    header: 'Remove a car',
    action: '/removecar'
}));
app.post('/removecar', (req, res) => {
    if (!req.body) res.sendStatus(500);
    const carNumber = req.body.productNumber;
    dataStorage.remove(carNumber)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
})
app.get('/inputform', (req, res) => res.render('form', {
    title: 'Add car',
    header: 'Add new car',
    action: '/add',
    productNumber: { value: '', readonly: '' },
    model: { value: '', readonly: '' },
    licencePlate: { value: '', readonly: '' },
    rating: { value: '', readonly: '' },
    year: { value: '', readonly: '' }
}));
app.post('/add', (req, res) => {
    if (!req.body) res.sendStatus(500);
    dataStorage.add(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
});
app.get('/updateform', (req, res) => res.render('form', {
    title: 'Update',
    header: 'Update car data',
    action: '/updatedata ',
    productNumber: { value: '', readonly: '' },
    model: { value: '', readonly: 'readonly' },
    licencePlate: { value: '', readonly: 'readonly' },
    rating: { value: '', readonly: 'readonly' },
    year: { value: '', readonly: 'readonly' }
}));
app.post('/updatedata', (req, res) => {
    if (!req.body) res.sendStatus(500);
    dataStorage.getOne(req.body.productNumber)
        .then(car => res.render('form', {
            title: 'Update',
            header: 'Update car data',
            action: '/update',
            productNumber: { value: car.productNumber, readonly: 'readonly' },
            model: { value: car.model, readonly: '' },
            licencePlate: { value: car.licencePlate, readonly: '' },
            rating: { value: car.rating, readonly: 'readonly' },
            year: { value: car.year, readonly: '' }

        }))
        .catch(error => sendErrorPage(res, error));
})
app.post('/update', (req, res) => {
    if (!req.body) res.sendStatus(500);
    dataStorage.update(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
})

server.listen(port, host, () =>
    console.log(`${host}:${port} serving ...`)
);
function sendErrorPage(res, error, title = 'Error', header = 'Error') {
    sendStatusPage(res, error, title, header);
}
function sendStatusPage(res, status, title = 'Status', header = 'Status') {
    return res.render('statusPage', { title, header, status });
}
