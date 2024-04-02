const mongoose = require("mongoose");



const expenseSchema = new mongoose.Schema({
    expense: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    }
})

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalExpenses: [expenseSchema]
});
module.exports = {registrationSchema,expenseSchema};
