"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBase = new typeorm_1.DataSource({
    type: 'sqlite',
    database: process.env.DATABASE || './src/database/database.sqlite',
    entities: [
        './src/models/*.ts'
    ],
    logging: true,
    synchronize: true
});
dataBase.initialize()
    .then(() => {
    console.log(`Banco de dados inicializado`);
})
    .catch((err) => {
    console.error(`Erro ao inicializar o banco de dados`, err);
});
exports.default = dataBase;
