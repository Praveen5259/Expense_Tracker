import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { getDataForToday } from './utils'; // Import the necessary functions
import './style.css';
import EditExpenseScreen from './edit'; // Import the EditExpenseScreen component

const TodayExpenseComponent = ({ totalExpense }) => {
    // State to store today's expenses
    const [todayExpenses, setTodayExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null); // State to track the expense being edited
    const state = useSelector((state) => state.users);

    // Fetch today's expenses when the component mounts or when totalExpense changes
    useEffect(() => {
        const todayExpensesData = getDataForToday(totalExpense);
        setTodayExpenses(todayExpensesData);
    }, [totalExpense]);

    // Function to handle deleting an expense
    const handleDeleteExpense = async (expense) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
    if (!isConfirmed) {
        // If not confirmed, return without deleting
        return;
    }
        try {
          const response = await fetch(`http://localhost:5000/delete-expense`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: state.loggedInEmail,
              category: expense.category,
              date: expense.date
            })
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete expense');
          }
    
          const updatedExpenses = todayExpenses.filter(exp => exp.category !== expense.category || exp.date !== expense.date);
          setTodayExpenses(updatedExpenses);
        } catch (error) {
          console.error('Error deleting expense:', error);
        }
      };
    // Function to handle editing an expense
    const handleEditExpense = (expense) => {
        setEditingExpense(expense); // Set the expense being edited
    };

    // Function to save the edited expense
    // Function to save the edited expense
const handleSaveEdit = async (editedExpense) => {
    try {
        const { loggedInEmail } = state;
        const response = await fetch(`http://localhost:5000/edit-expense`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loggedInEmail,
                originalExpense: editingExpense, // Pass the original expense data
                editedExpense: editedExpense // Pass the edited expense data
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update expense');
        } else {
            const updatedExpense = await response.json();
            console.log('Expense updated successfully:', updatedExpense);
            setTodayExpenses(getDataForToday(updatedExpense.expense));
            setEditingExpense(null); // Reset the editingExpense state
        }
    } catch (error) {
        console.error('Error updating expense:', error);
    }
};
    // Function to cancel editing an expense
    const handleCancelEdit = () => {
        setEditingExpense(null); // Reset the editingExpense state
    };

    return (
        <div className='table-container'>
            <h2>Today's Expenses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Expense</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todayExpenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.category}</td>
                            <td>{expense.expense}</td>
                            <td>
                                <button className='Delete' onClick={() => handleDeleteExpense(expense)}>
                                    Delete
                                </button>
                                <button className='Edit' onClick={() => handleEditExpense(expense)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render EditExpenseScreen component if an expense is being edited */}
            {editingExpense && (
                <EditExpenseScreen
                    expense={editingExpense}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default TodayExpenseComponent;
