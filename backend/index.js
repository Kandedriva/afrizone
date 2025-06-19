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


app.use(cors({
    origin: "https://cerulean-pika-4b4fd6.netlify.app/",
    credentials: true,
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



// const { Client } = pkg;
// const db = new pg.Client({
//     user: process.env.DATABASE_USER,
//     database: process.env.DATABASE_NAME,
//     host: process.env.DATABASE_HOST,
//     password: process.env.DATABASE_PASSWORD,
//     port: process.env.DATABASE_PORT
// });
// const db = new Client({
//     connectionString: process.env.DATABASE_URL,
    
//     ssl: {
//       rejectUnauthorized: false // required for Supabase on Render
//     },
//     family: 4
//   });

// db.connect();
// const pgSession = pgSessionPkg(session);


// app.use(session({
//     store: new pgSession({
//         pool: db,
//         tableName: "sessions",
//         createTableIfMissing: false,
//     }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 365,
//         httpOnly: true,
//     },
// }));



// Fetch all products
// app.get("/productList", async (req, res) => {
//     try {
//         const products = await db.query("SELECT * FROM product");
//         res.json(products.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch products" });
//     }
// });

// // Add product to cart
// app.post("/cart", async (req, res) => {
//     const { product_id, quantity } = req.body;
//     const session_id = req.sessionID;
//     let cartId = req.session.cart_id;
//     console.log(quantity)
//     console.log(cartId)

//     try {
//         // Create a new cart if none exists for the session
//         if (!cartId) {
//             const { rows } = await db.query(
//                 "INSERT INTO carts (session_id, created_at) VALUES ($1, NOW()) RETURNING id",
//                 [session_id]
//             );
//             cartId = rows[0].id;
//             req.session.cart_id = cartId;
//         }

//         // Check if the product is already in the cart
//         const { rows: existingItems } = await db.query(
//             "SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2",
//             [cartId, product_id]
//         );

//         if (existingItems.length > 0) {
//             // Product exists, update quantity
//             await db.query(
//                 "UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2",
//                 [quantity, existingItems[0].id]
             
//             );
//         } else {
//             // Add new product to cart
//             await db.query(
//                 "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
//                 [cartId, product_id, quantity]
//             );
//         }

//         res.status(200).json({ message: "Product successfully added to cart", cart_id: cartId });

//     } catch (error) {
//         console.error("Error adding product to cart:", error);
//         res.status(500).json({ error: "Failed to add product to cart" });
//     }
// });

// // Retrieve cart for a session
// app.get("/cart_items", async (req, res) => {
//     const session_id = req.sessionID;
//     console.log(session_id)
//     if (!session_id) return res.json(console.log("Noo session id", session_id),    { cart: [] });
    
//     try {
//         const cartQuery = `
//         SELECT ci.product_id, p.product_name, p.product_description, 
//            p.product_image, p.product_price, ci.quantity, 
//            (p.product_price * ci.quantity) AS total_price
//     FROM cart_items ci
//     JOIN product p ON ci.product_id = p.product_id
//     JOIN carts c ON ci.cart_id = c.id
//     WHERE c.session_id = $1
//         `;

//         const { rows } = await db.query(cartQuery, [session_id]);
//         console.log("Cart items fetched:", rows)
//         res.json({ cart: rows });

//     } catch (err) {
//         console.error("Error fetching cart:", err);
//         res.status(500).json({ message: "Error fetching cart." });
//     }
// });

// // User login and merge cart
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const session_id = req.sessionID;

//     try {
//         const { rows } = await db.query(
//             "SELECT id FROM users WHERE email = $1 AND password = $2",
//             [email, password]
//         );

//         if (rows.length > 0) {
//             const user_id = rows[0].id;

//             // Update the cart to belong to the logged-in user
//             await db.query("UPDATE carts SET user_id = $1 WHERE session_id = $2", [user_id, session_id]);

//             req.session.user_id = user_id; // Save user ID in session
//             res.json({ message: "Login successful", user_id });
//         } else {
//             res.status(401).json({ error: "Invalid credentials" });
//         }

//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is up and running on port ${PORT}`);
// });








// import express from "express";
// import bodyParser from "body-parser";
// import pkg from 'pg';
// import dotenv from "dotenv";
// import cors from "cors";
// import session from "express-session";
// import pgSessionPkg from "connect-pg-simple";
// import path from "path";
// import { fileURLToPath } from 'url';

// // Load environment variables
// dotenv.config();

// const app = express();
// const { Client, Pool } = pkg; // Use Pool for session store
// const pgSession = pgSessionPkg(session);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Database connection
// const db = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false // Required for remote PostgreSQL like Supabase
//     },
//     family: 4
// });

// // Connect to database
// try {
//     await db.connect();
//     console.log("Connected to database");
// } catch (err) {
//     console.error("Database connection error:", err);
//     process.exit(1);
// }

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../public')));
// app.use(cors({
//     origin: "https://cerulean-pika-4b4fd6.netlify.app",
//     credentials: true,
// }));

// // Session setup (use Pool instead of Client)
// const sessionPool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     },
//     family: 4
// });

// if (!process.env.SESSION_SECRET) {
//     console.error("SESSION_SECRET is not defined in .env");
//     process.exit(1);
// }

// app.use(session({
//     store: new pgSession({
//         pool: sessionPool,
//         tableName: "sessions",
//         createTableIfMissing: false,
//     }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 365,
//         httpOnly: true,
//     },
// }));

// const PORT = process.env.PORT || 5000;

// // Routes
// app.get("/productList", async (req, res) => {
//     try {
//         const products = await db.query("SELECT * FROM product");
//         res.json(products.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch products" });
//     }
// });

// app.post("/cart", async (req, res) => {
//     const { product_id, quantity } = req.body;
//     const session_id = req.sessionID;
//     let cartId = req.session.cart_id;

//     try {
//         if (!cartId) {
//             const { rows } = await db.query(
//                 "INSERT INTO carts (session_id, created_at) VALUES ($1, NOW()) RETURNING id",
//                 [session_id]
//             );
//             cartId = rows[0].id;
//             req.session.cart_id = cartId;
//         }

//         const { rows: existingItems } = await db.query(
//             "SELECT id FROM cart_items WHERE cart_id = $1 AND product_id = $2",
//             [cartId, product_id]
//         );

//         if (existingItems.length > 0) {
//             await db.query(
//                 "UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2",
//                 [quantity, existingItems[0].id]
//             );
//         } else {
//             await db.query(
//                 "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
//                 [cartId, product_id, quantity]
//             );
//         }

//         res.status(200).json({ message: "Product added to cart", cart_id: cartId });

//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         res.status(500).json({ error: "Failed to add product to cart" });
//     }
// });

// app.get("/cart_items", async (req, res) => {
//     const session_id = req.sessionID;
//     if (!session_id) return res.json({ cart: [] });

//     try {
//         const { rows } = await db.query(`
//             SELECT ci.product_id, p.product_name, p.product_description,
//                    p.product_image, p.product_price, ci.quantity,
//                    (p.product_price * ci.quantity) AS total_price
//             FROM cart_items ci
//             JOIN product p ON ci.product_id = p.product_id
//             JOIN carts c ON ci.cart_id = c.id
//             WHERE c.session_id = $1
//         `, [session_id]);

//         res.json({ cart: rows });

//     } catch (err) {
//         console.error("Error fetching cart:", err);
//         res.status(500).json({ message: "Error fetching cart." });
//     }
// });

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const session_id = req.sessionID;

//     try {
//         const { rows } = await db.query(
//             "SELECT id FROM users WHERE email = $1 AND password = $2",
//             [email, password]
//         );

//         if (rows.length > 0) {
//             const user_id = rows[0].id;
//             await db.query("UPDATE carts SET user_id = $1 WHERE session_id = $2", [user_id, session_id]);
//             req.session.user_id = user_id;
//             res.json({ message: "Login successful", user_id });
//         } else {
//             res.status(401).json({ error: "Invalid credentials" });
//         }

//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

