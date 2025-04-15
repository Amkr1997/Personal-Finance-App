const { initialization } = require("./db/db.connect");
const Transaction = require("./models/transaction.model");
initialization();

const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  openSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("Express Started"));

app.post("/add/transaction", async (req, res) => {
  const dataToAdd = req.body;

  try {
    const newTransaction = new Transaction(dataToAdd);
    const savedTransation = await newTransaction.save();

    if (!savedTransation)
      return res.status(404).json({ message: "Cannot save the transaction" });

    return res
      .status(200)
      .json({ message: "Transaction got saved", savedTransation });
  } catch (error) {
    return res.status(504).json({ message: "Internal server error" });
  }
});

app.get("/get/transaction", async (req, res) => {
  try {
    const allTransation = await Transaction.find();

    if (!allTransation)
      return res
        .status(404)
        .json({ message: "Cannot get all the transactions" });

    return res
      .status(200)
      .json({ message: "Transaction fetched", allTransation });
  } catch (error) {
    return res.status(504).json({ message: "Internal server error" });
  }
});

app.post("/update/transaction/:id", async (req, res) => {
  const dataToUpdate = req.body;
  const dataId = req.params.id;

  try {
    const updatedTransation = await Transaction.findByIdAndUpdate(
      dataId,
      dataToUpdate,
      { new: true }
    );

    if (!updatedTransation)
      return res.status(404).json({ message: "Cannot update the transaction" });

    return res
      .status(200)
      .json({ message: "Transaction updated successfully", updatedTransation });
  } catch (error) {
    return res.status(504).json({ message: "Internal server error" });
  }
});

app.delete("/delete/transaction/:id", async (req, res) => {
  const dataId = req.params.id;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(dataId);

    if (!deletedTransaction)
      return res.status(404).json({ message: "Cannot delete the transaction" });

    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return res.status(504).json({ message: "Internal server error" });
  }
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log("Server started at port", PORT));
