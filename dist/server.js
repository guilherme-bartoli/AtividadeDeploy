"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ormconfig_1 = __importDefault(require("./database/ormconfig"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json()); // habilita o express para receber dados no formato json
app.use(routes_1.default); // habilita as rotas
app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
    console.log(`Banco de dados`, ormconfig_1.default.isInitialized ? 'inicializado' : 'não inicializado');
});
