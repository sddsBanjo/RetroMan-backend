import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

// Configuração inicial
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5501;

app.use(express.json());

app.all("/api/auth/*path", toNodeHandler(auth));

app.get("/test", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
    res.json({
        message: "🤖 RetroMan rodando!",
        version: "1.0.0",
        endpoints: {
            test: "/test",
        },
    });
});

app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`);
});