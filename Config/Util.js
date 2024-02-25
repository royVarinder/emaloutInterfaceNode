//function to print current time stamp 
const moment = require('moment');
const FORMAT = "DD-MM-YYYY hh:mm A";

module.exports = {
    printCurrentTimeStamp: () => {
        const _moment = moment();
        return _moment.format(FORMAT);
    }, 

}