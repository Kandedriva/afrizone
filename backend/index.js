import express from "express";
import bodyParser from "body-parser";
import pkg from 'pg';
import env from "dotenv";
import cors from "cors";
// import session from "express-session";
// import pgSessionPkg from "connect-pg-simple";
import  path  from "path";
import { fileURLToPath } from 'url';
import Stripe from "stripe";

const { Pool } = pkg;

env.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


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

/////////////STRIPE PAYEMENT INTEGRETION////////////

const myDomain = "cerulean-pika-4b4fd6.netlify.app"

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1ReRq6R0RcCSBOPSFARISwwW',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${myDomain}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});


app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

