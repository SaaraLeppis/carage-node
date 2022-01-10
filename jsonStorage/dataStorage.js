'use strict';
const { CODES, MESSAGES } = require('./statuscodes');

const {
    getAllFromStorage,
    getOneFromStorage,
    updateStorage,
    removeFromStorage,
    insertToStorage
} = require('./storage');

module.exports = class Datastorage {
    get CODES() {
        return CODES;
    }

    getAll() {
        return getAllFromStorage();
    }
    getOne(productNumber) {
        console.log(productNumber);
        return new Promise(async (resolve, reject) => {
            if (!productNumber) {
                reject(MESSAGES.NOT_FOUND(`--empty--`));
            }
            else {
                const result = await getOneFromStorage(productNumber);
                console.log(result);
                if (result) {
                    resolve(result);
                }
                else {
                    reject(MESSAGES.NOT_FOUND(productNumber))
                }
            }
        })
    }
    add(car) {
        return new Promise(async (resolve, reject) => {
            if (car) {
                if (!car.productNumber) {
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if (await getOneFromStorage(car.productNumber)) {
                    reject(MESSAGES.ALREADY_IN_USE(car.productNumber));
                }
                else if (await insertToStorage(car)) {
                    resolve(MESSAGES.INSERT_OK(car.productNumber));
                }
                else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else {
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    }
    update(car) {
        return new Promise(async (resolve, reject) => {
            if (car) {
                if (await updateStorage(car)) {
                    resolve(MESSAGES.UPDATE_OK(car.productNumber));
                }
                else {
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else {
                reject(MESSAGES.NOT_UPDATED());
            }
        })
    }
    remove(productNumber) {
        return new Promise(async (resolve, reject) => {
            if (!productNumber) {
                reject(MESSAGES.NOT_FOUND('--empty--'));
            }
            else if (await removeFromStorage(productNumber)) {
                resolve(MESSAGES.REMOVE_OK(productNumber));
            }
            else {
                reject(MESSAGES.NOT_REMOVED(productNumber));
            }
        })
    }
}
