const mongoose = require("mongoose");
const {registrationSchema,expenseSchema} = require('./schema')

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Praveen5259:JaatPraveen127201@cluster0.bmndslw.mongodb.net/expanseApp"
    );
  } catch (error) {
    throw error
  }
};
const UserModel = mongoose.models.users || mongoose.model("users", registrationSchema);
const insert = async (data) => {
    await dbConnect();

    if(data && data.name && data.email && data.pwd){ 
        try {
            const newData = {
                name: data.name,
                email: data.email,
                password: data.pwd,
                totalExpenses: []
            };
            
            await UserModel.create(newData);
            return response = {
                data: "Registration Successful"
            };
        } catch (error) {
            console.log(error)
            return response = {
                data: "Something went wrong"
            };
        }
    } else {
        console.error("Incomplete data provided for insertion");
    }
};

const getDetails = async (data) => {
    try {
        await dbConnect();

       

        const result = await UserModel.findOne({email: data.email, password: data.pwd });
        if (result) {
            return { data: "Login successful", email:result.email, name: result.name };
        } else {
            return { data: 'Invalid email or password', email: undefined, name: undefined };
        }
    } catch (error) {
        console.error('Error in getDetails:', error);
        throw error;
    }
};
const AddExpense = async (data) => {
    await dbConnect();

    if (data && data.expense && data.category && data.date && data.email && data.name) { 
        try {
            const newData = {
                expense: data.expense,
                category: data.category,
                date: data.date,
            };
            const result = await UserModel.findOneAndUpdate(
                { email: data.email, name: data.name },
                { $push: { totalExpenses: newData } },
                { new: true }
            );
            if (result) {
                return {
                    success: true,
                    message: "Expense added successfully",
                    user: result
                };
            } else {
                return {
                    success: false,
                    message: "User not found"
                };
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Something went wrong"
            };
        }
    } else {
        console.error("Incomplete data provided for insertion");
        return {
            success: false,
            message: "Incomplete data provided for insertion"
        };
    }
};
const getExpense = async (data) => {
    try {
        await dbConnect();
        
        const result = await UserModel.find({ 
            email: data.email,
          });
        if (result) {
            return { message: "Get expense successfully", expense: result[0]?.totalExpenses};
        } else {
            return { data: 'Invalid expense', expense: undefined, category: undefined,date:undefined};
}
    } catch (error) {
        console.error('Error in getting expense:', error);
        throw error;
    }
};
const deleteExpenseByEmailAndIndex = async (data) => {
    try {
        await dbConnect();
        console.log('in delete expense')
        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        // Get the current date
        let currentDate = (new Date()).toJSON().split('T')[0];
        const toCheckDate = data.date ?  (new Date(data.date)).toJSON().split('T')[0] : currentDate
        // Filter expenses not matching the given category and current date
        user.totalExpenses = user.totalExpenses.filter(expense =>
            !(expense.category === data.category &&
            expense.date.toJSON().split('T')[0] === toCheckDate)
        );

        // Save the updated user document
        await user.save();

        return { success: true, message: 'Expenses deleted successfully', expenses: user.totalExpenses };
    } catch (error) {
        console.error('Error during deleting expenses by email and category:', error);
        throw error;
    }
};
const editExpenseByEmailAndIndex = async (data) => {
    try {
        await dbConnect();
        // Find the user
        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        const currentDate = new Date().toISOString().split('T')[0];
        const expenseToUpdateIndex = user.totalExpenses.findIndex(expense =>
            expense.category === data.originalExpense.category &&
            expense.date.toISOString().split('T')[0] === currentDate
        );
        if (expenseToUpdateIndex === -1) {
            return { success: false, message: 'Expense not found' };
        }
        user.totalExpenses[expenseToUpdateIndex].expense = data.editedExpense.expense;
        user.totalExpenses[expenseToUpdateIndex].category = data.editedExpense.category;
        await user.save();
        return { success: true, message: 'Expense updated successfully', expenses: user.totalExpenses };
    } catch (error) {
        console.error('Error during updating expense by email and category:', error);
        throw error;
    }
};
const editExpenseByEmailAndIndex1= async (data) => {
    try {
        await dbConnect();
        // Find the user
        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Convert the edited expense amount to a number
        data.editedExpense.expense = parseFloat(data.editedExpense.expense);

        // Find the index of the original expense in the user's expenses array
        const expenseToUpdateIndex = user.totalExpenses.findIndex(expense =>
            expense._id.toString() === data.originalExpense._id
        );

        // Check if the expense to update exists
        if (expenseToUpdateIndex === -1) {
            return { success: false, message: 'Expense not found' };
        }

        // Update the expense details
        user.totalExpenses[expenseToUpdateIndex].expense = data.editedExpense.expense;
        user.totalExpenses[expenseToUpdateIndex].category = data.editedExpense.category;

        // Save the updated user document
        await user.save();

        return { success: true, message: 'Expense updated successfully', expenses: user.totalExpenses };
    } catch (error) {
        console.error('Error during updating expense by email and category:', error);
        throw error;
    }
};

module.exports = {insert, getDetails,AddExpense,getExpense,deleteExpenseByEmailAndIndex,editExpenseByEmailAndIndex,editExpenseByEmailAndIndex1};