import React, { useState, useEffect } from 'react';

const EditExpenseScreen = ({ expense, onSave, onCancel }) => {
  // Initialize state with the provided expense
  const [editedExpense, setEditedExpense] = useState({
    category: expense.category,
    expense: expense.expense,
  });

  // handleChange function to update editedExpense state
 const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for the expense amount to allow only numeric input
    if (name === 'expense' && isNaN(value)) {
      return; // Exit early if the input is not a number
    }

    setEditedExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
};


  // useEffect to log editedExpense for demonstration
  useEffect(() => {
    console.log(editedExpense);
  }, [editedExpense]);

  // handleSubmit function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedExpense); // Call onSave function with editedExpense as argument
  };

  return (
    <div className="field-container">
      <div className="labelClass">
        <label htmlFor="expense">Amount</label>
      </div>
      <div className="inputClass">
        <input
          type="text"
          id="expense"
          name="expense"
          value={editedExpense.expense}
          onChange={handleChange} // Attach handleChange to input onChange event
          min="1"
          required
        />
      </div>

      <div className="labelClass">
        <label htmlFor="category">Category</label>
      </div>
      <div className="inputClass">
        <select
          name="category"
          id="category"
          value={editedExpense.category}
          onChange={handleChange} // Attach handleChange to select onChange event
          required
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Grocery">Grocery</option>
          <option value="House Rent">House Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <button type="submit" className="Save" onClick={handleSubmit}>
          Save
        </button>
        <button type="button" className="Cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditExpenseScreen;
