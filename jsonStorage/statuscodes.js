'use strict';

const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1,
    INSERT_OK: 2,
    NOT_INSERTED: 3,
    ALREADY_IN_USE: 4,
    REMOVE_OK: 5,
    NOT_REMOVED: 6,
    UPDATE_OK: 7,
    NOT_UPDATED: 8
};

const MESSAGES = {
    PROGRAM_ERROR: () => ({
        message: 'Sorry! Error in the program',
        code: CODES.PROGRAM_ERROR,
        type: 'error'
    }),
    NOT_FOUND: productNumber => ({
        message: `No car found with given product number ${productNumber}`,
        code: CODES.NOT_FOUND,
        type: 'error'
    }),
    INSERT_OK: productNumber => ({
        message: `Car ${productNumber} was added`,
        code: CODES.INSERT_OK,
        type: 'info'
    }),
    NOT_INSERTED: () => ({
        message: 'Car was not added',
        code: CODES.NOT_INSERTED,
        type: 'error'
    }),
    ALREADY_IN_USE: productNumber => ({
        message: `Product number ${productNumber} already in use`,
        code: CODES.ALREADY_IN_USE,
        type: 'error'
    }),
    REMOVE_OK: productNumber => ({
        message: `Car ${productNumber} was removed`,
        code: CODES.REMOVE_OK,
        type: 'info'
    }),
    NOT_REMOVED: productNumber => ({
        message: `No car found with product number ${productNumber}. Nothing removed`,
        code: CODES.NOT_REMOVED,
        type: 'error'
    }),
    UPDATE_OK: productNumber => ({
        message: `Car ${productNumber} was updated`,
        code: CODES.UPDATE_OK,
        type: 'info'
    }),
    NOT_UPDATED: () => ({
        message: 'Data was not updated',
        code: CODES.NOT_UPDATED,
        type: 'error'
    })
};

module.exports = { CODES, MESSAGES };