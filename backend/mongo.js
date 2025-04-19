const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/Expense-tracker")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("Connection to MongoDB failed");
  });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true }
});

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  details: { type: String, required: true },
  transType: { type: String, required: true, enum: ["expense", "income"] },
  category: { type: String },
  date: { type: Date, required: true } 
});

const User = mongoose.model("user", userSchema);
const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = { User, Transaction };
