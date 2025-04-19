const express = require("express");
const { User, Transaction } = require("./mongo");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.post("/login", async (req, res) => {
  const { user, password } = req.body;

  try {
    const check = await User.findOne({ user: user });

    if (check) {
      res.json(check.password === password ? "exist" : "Incorrect_password");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, user, password } = req.body;

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      await User.create({ email, user, password });
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find(); 
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions." });
  }
});

app.post("/addTransaction", async (req, res) => {
  const { amount, details, transType, category, userId, date } = req.body;

  try {
    const newTransaction = new Transaction({
      userId,
      amount,
      details,
      transType,
      category,
      date: new Date(date),
    });

    await newTransaction.save();
    res.json({ message: "Transaction added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
