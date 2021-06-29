const EventEmitter = require('events');

global.ordermanagement = {
    onSave : new EventEmitter()
};