import express from "express";
const app = express();
import { join } from "path";

app.use(express.static(join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () =>
{
    console.log(`Servidor escuchando en http://localhost:${ PORT }`);
});
