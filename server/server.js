const express = require('express');
const cors = require('cors');
const {insert, getDetails, AddExpense,getExpense,deleteExpenseByEmailAndIndex,editExpenseByEmailAndIndex,editExpenseByEmailAndIndex1} = require('./dbConnect');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type']
  }));
app.post('/register', async function(req, res) {
    try {
        const result = await insert(req.body);
        res.json({ message: result.data });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during registration" });
    }
});

app.post('/login', async function(req, res) {
    try {
        const result = await getDetails(req.body);
        res.json({ message: result.data, name: result.name, email: result.email });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred during login" });
    }
})
app.post('/add-expense', async function(req, res) {
    try {
        const result = await AddExpense(req.body);
        res.json({ message: result.message });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during adding expense" });
    }
});
app.post('/get-expense',async (req,res)=>{
    try{
        const result= await getExpense(req.body);
        res.json({totalExpenses:result.expense, message: result.message})
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred during login" });
    }
});
app.delete('/delete-expense', async (req, res) => {
    try {
        console.log('found delete',req.body);
        const result = await deleteExpenseByEmailAndIndex(req.body);
        if (result.success) {
            res.json({ message: 'Expense deleted successfully', expense: result.expenses });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        console.error('Error during deleting expense:', error);
        res.status(500).json({ error: 'An error occurred during deleting expense' });
    }
});
app.put('/edit-expense', async (req, res) => {
    try {
        console.log('found edit', req.body);
        // Assuming you have a function named editExpenseByEmailAndIndex to handle editing expenses
        const result = await editExpenseByEmailAndIndex(req.body);
        if (result.success) {
            res.json({ message: 'Expense edited successfully', expense: result.expenses });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        console.error('Error during editing expense:', error);
        res.status(500).json({ error: 'An error occurred during editing expense' });
    }
});
app.put('/editWholeExpense', async (req, res) => {
    try {
        console.log('found edit', req.body);
        // Assuming you have a function named editExpenseByEmailAndIndex to handle editing expenses
        const result = await editExpenseByEmailAndIndex1(req.body);
        if (result.success) {
            res.json({ message: 'Expense edited successfully', expense: result.expenses });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        console.error('Error during editing expense:', error);
        res.status(500).json({ error: 'An error occurred during editing expense' });
    }
});



app.listen(5000, () => console.log('server started on port 5000'))