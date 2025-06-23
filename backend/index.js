import express from "express";
import bodyParser from "body-parser";
import pkg from 'pg';
import env from "dotenv";
import cors from "cors";
// import session from "express-session";
// import pgSessionPkg from "connect-pg-simple";
import  path  from "path";
import { fileURLToPath } from 'url';

const { Pool } = pkg;

env.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));


// app.use(cors({

//     origin: "https://cerulean-pika-4b4fd6.netlify.app",
//     credentials: true,
// }));
app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://cerulean-pika-4b4fd6.netlify.app"
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));
 
const PORT = process.env.PORT || 5001;

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl:{
        require: true,
        rejectUnauthorized: false
    }
});
// const router = express.Router();

app.get("/productList", async(req, res)=>{
    const client = await pool.connect();

    try {
        const products = await client.query("SELECT * FROM product");
        res.json(products.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

