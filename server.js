const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const users = [{ id: 1, username: "admin", password: bcrypt.hashSync("password", 8) }];
const secretKey = "mysecret"; // Use dotenv for production

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
});

app.get("/api/dashboard", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "User not logged in" });

    try {
        jwt.verify(token, secretKey);
        res.json({ cards: [{ id: 1, title: "View India Map" }, { id: 2, title: "Another View" }] });
    } catch {
        res.status(403).json({ message: "Invalid token" });
    }
});

app.get("/api/map-view", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "User not logged in" });

    try {
        jwt.verify(token, secretKey);
        res.json({ message: "Map View Loaded" });
    } catch {
        res.status(403).json({ message: "Invalid token" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
