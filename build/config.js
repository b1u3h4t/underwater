"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env" });
const config = {
    serviceName: process.env.SERVICENAME || "UNDERWATER",
    port: Number(process.env.PORT) || 3000,
    loggerLevel: "debug",
    db: {
        host: process.env.PGHOST || "",
        user: process.env.PGUSER || "",
        database: process.env.PGDATABASE || "",
        password: process.env.PGPASSWORD || "",
        port: Number(process.env.PGPORT) || 5432,
        max: Number(process.env.PG_MAX_CLIENT) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
    },
    db_local: {
        host: process.env.PGHOST_LOCAL || "",
        user: process.env.PGUSER_LOCAL || "",
        database: process.env.PGDATABASE_LOCAL || "",
        password: process.env.PGPASSWORD_LOCAL || "",
        port: Number(process.env.PGPORT_LOCAL) || 5432,
        max: Number(process.env.PG_MAX_CLIENT) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
    },
    rpcAddress: process.env.RPC_HTTP,
};
module.exports = config;
