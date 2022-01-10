'use strict';
const path = require('path');
const { readStorage, writeStorage } = require('./readerWriter');
const { storageFile, adapterFile } = require('./storageConfig.json');
const { adapt } = require(path.join(__dirname, adapterFile))
const storageFilePath = path.join(__dirname, storageFile);
async function getAllFromStorage() {
    return readStorage(storageFilePath);
}
async function getOneFromStorage(productNumber) {
    const storage = await readStorage(storageFilePath);

    return storage.find(car => car.productNumber == productNumber) || null;
}
async function insertToStorage(newCar) {
    const storage = await readStorage(storageFilePath);
    storage.push(adapt(newCar));
    return await writeStorage(storageFilePath, storage);
}
async function updateStorage(updatedCar) {
    const storage = await readStorage(storageFilePath);
    const oldCar = storage.find(car => car.productNumber == updatedCar.productNumber);
    if (oldCar) {
        Object.assign(oldCar, adapt(updatedCar));
        return await writeStorage(storageFilePath, storage)
    }
    return false;
}
async function removeFromStorage(productNumber) {
    const storage = await readStorage(storageFilePath);
    const i = storage.findIndex(car => car.productNumber == productNumber);
    if (i < 0) {
        return false;
    }
    storage.splice(i, 1);
    return await writeStorage(storageFilePath, storage);
}
module.exports = {
    getAllFromStorage,
    getOneFromStorage,
    insertToStorage, updateStorage,
    removeFromStorage
}
