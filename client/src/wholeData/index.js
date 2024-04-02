import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import './style.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import EditExpenseScreen from './edit.js';

const WholeData = () => {
  const [aggregatedExpenses, setAggregatedExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const data = useSelector((state) => state.users);
  const columns = [
    { label: 'Category', key: 'category' },
    { label: 'Amount', key: 'expense' },
    { label: 'Date', key: 'date' },
  ];

  const handleExportRows = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map(column => column.label)],
      body: aggregatedExpenses.map(expense => columns.map(column => expense[column.key])),
    });
    doc.save('whole_expense_data.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-expense', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.loggedInEmail })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        if (responseData.message === 'Get expense successfully') {
          const aggregatedExpenses = aggregateExpenses(responseData.totalExpenses);
          setAggregatedExpenses(aggregatedExpenses);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, [data.loggedInEmail]);

  const aggregateExpenses = (expenses) => {
    expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const aggregated = {};
    for (const expense of expenses) {
      const key = `${expense.category}_${expense.date}`;
      if (!aggregated[key]) {
        aggregated[key] = { ...expense };
      } else {
        aggregated[key].expense = parseFloat(aggregated[key].expense) + parseFloat(expense.expense);
      }
    }
    return Object.values(aggregated);
  };

  const handleDeleteExpense = async (expense) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/delete-expense`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.loggedInEmail,
          category: expense.category,
          date: expense.date
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      const updatedExpenses = aggregatedExpenses.filter(exp => exp.category !== expense.category || exp.date !== expense.date);
      setAggregatedExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense({...expense});
  };

  const handleSaveEdit = async (editedExpense) => {
    try {
        const { loggedInEmail } = data;
        const response = await fetch(`http://localhost:5000/editWholeExpense`, {
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
            setAggregatedExpenses((updatedExpense.expense));
            setEditingExpense(null); // Reset the editingExpense state
        }
    } catch (error) {
        console.error('Error updating expense:', error);
    }
};
  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className='wholeExpenseData'>
      <div className="button-container">
        <button className="export-button" onClick={handleExportRows}>Export Data</button>
      </div>
      <div className="table-container">
        <h2>Whole Expense Data</h2>
        <table className='Table'>
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={index} className={header.className}>{header.label}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {aggregatedExpenses.map((expense, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className='Td'>{expense.category}</td>
                  <td className='Td'>{expense.expense}</td>
                  <td className='Td'>{new Date(expense.date).toLocaleDateString()}</td>
                  <td className='Td'>
                    <button className="delete-button1" onClick={() => handleDeleteExpense(expense)}>Delete</button>
                    <button className="edit-button" onClick={() => handleEditExpense(expense)}>Edit</button>
                  </td>
                </tr>
                {editingExpense && editingExpense.category === expense.category && editingExpense.date === expense.date && (
                  <tr>
                    <td colSpan="4">
                      <EditExpenseScreen
                        expense={editingExpense}
                        onSave={handleSaveEdit}
                        onCancel={handleCancelEdit}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WholeData;
