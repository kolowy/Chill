    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logManager = void 0;
module.exports = {
    logManager: function (message, logLevel) {
        /**
         * A log manager
         * @param {Int} minLogLevel
         * @param {CallableFunction} callbackKill
         */
        function logManager(min, callbackKill) {
            this.minLogLevel = min;
            this.callbackExit = callbackKill;
        }
        /**
         * Log a message. Log levels :
         * -1 Load;
         * 0 Info;
         * 1 Warn;
         * 2 Error;
         * 3 Fatal;
         * @param {String} message
         * @param {Int} logLevel
         * @return boolean
         */

            var actualDate = new Date();
            //FIXME Find a better way to have the date
            var dateString = actualDate.getFullYear() + "-" + actualDate.getMonth() + "-" + actualDate.getDate() + " " + actualDate.getHours() + ":" + actualDate.getMinutes() + ":" + actualDate.getSeconds();
            var color = "";
            var prefix = "[";
            switch (logLevel) {
                case -1: {
                    prefix += "LOAD";
                    color = "\x1b[34m"; // Blue
                    break;
                }
                case 0: {
                    prefix += "INFO";
                    color = "\x1b[32m"; // Green
                    break;
                }
                case 1: {
                    prefix += "WARN";
                    color = "\x1b[33m"; // Yellow
                    break;
                }
                case 2: {
                    prefix += "ERROR";
                    color = "\x1b[31m"; //Red
                    break;
                }
                case 3: {
                    prefix += "FATAL";
                    color = "\x1b[35m"; //Red
                    break;
                }
                default: {
                    this.log("Unvalid log level : \"" + logLevel + "\" message : " + message, 2);
                    return;
                }
            }
            ;
            prefix += "]";
            console.log("" + dateString + color + " " + prefix + " " + message + "\u001B[0m");
            if (logLevel < 3)
                return;
            this.callbackExit();
        return logManager;
    }
}
