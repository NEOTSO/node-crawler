"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = void 0;
var formatTime = function (t) {
    return t.getFullYear() + "." + t.getMonth() + "." + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
};
exports.formatTime = formatTime;
