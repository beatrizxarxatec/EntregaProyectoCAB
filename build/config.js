"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.PORT = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const PORT = 3000;
exports.PORT = PORT;
const db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL22",
    database: "proyecto_final",
});
exports.db = db;
