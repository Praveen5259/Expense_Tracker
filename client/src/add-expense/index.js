import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './styles.css'
const AddExpense = () => {
  const navigate = useNavigate();
  const [registrationMessage, setRegistrationMessage] = useState('')
  const [expense, setExpense] = useState("");
    const [category, setCategory] = useState("");
    const [expenseMessage, setExpenseMessage] = useState("");
    const [date, setDate] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false); // State variable for modal visibility
  const [successMessage, setSuccessMessage] = useState("");
    const data = useSelector((state) => state.users)
    const handleExpenseChange = (e) => {
      const inputValue = e.target.value;
      // Check if the input value is a number
      if (/^\d*$/.test(inputValue)) {
        // If it's a number, update the state
        setExpense(inputValue);
      }
    };
  const OnSubmit =  (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/add-expense', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         expense: expense,
         category: category,
         date: date,
         name: data.loggedInName,
         email: data.loggedInEmail
        })
       }).then((res) => {
        return res.json();
      })
      .then((data) => {
        setExpenseMessage(data.message);
        setSuccessMessage("Expense added successfully");
        setShowConfirmation(true);
      });
  };

  useEffect(() => {
    if (successMessage === 'Expense added successfully') {
      setTimeout(() => {
        setShowConfirmation(false); // Hide confirmation modal
        navigate('/dashboard');
      }, 1000);
    }
  }, [successMessage, navigate]);

  return (
    <div className="FullPage1">
    <div className="container">
      {showConfirmation && (
        <div className="confirmationModal">
          <h3>{successMessage}</h3>
          {/* Additional information or actions in the modal */}
        </div>
      )}
      <h1>Add Expense</h1>
      <form method="post" onSubmit={OnSubmit}>
        <div className="field-container">
          <div className="labelClass">
            <label>Amount</label>
            <br />
          </div>
          <div className="inputClass">
          <input 
      type="text" 
      id="expense" 
      value={expense} 
      onChange={handleExpenseChange} 
      required 
    />
          </div>
          <div className="labelClass">
            <label>Category</label>
            <br />
          </div>
          <div className="inputClass">
          <select name="category" onChange={(e) => setCategory(e.target.value)} required>
          <option name="" value="">Select</option>
            <option name="Food">Food</option>
            <option name="Travel">Travel</option>
            <option name="Grocery">Grocery</option>
            <option name="House Rent">House Rent</option>
            <option name="Shopping">Shopping</option>
            <option name="Fruit and vegetable">Others</option>
          </select>
          </div>
          <div className="labelClass">
            <label>Date</label>
            <br />
          </div >
          <div className="inputClass">
          <input type="date" id="date" onChange={(e) => setDate(e.target.value)} required/>
          </div>
          <br />
          <br />
        </div>
        <button type="submit" value="Register" className="expenseButton" onSubmit={OnSubmit}>
          Add Expense
        </button>
      </form>
    </div>
    </div>
  );
};
export default AddExpense;
