import {useEffect, useState} from 'react'
import BarGraph  from './barChart';
import Chart from "chart.js/auto";
import './style.css'
import { useSelector } from "react-redux";
import { CategoryScale } from "chart.js";
import {useNavigate} from 'react-router-dom'
import TodayExpense from './today';
import DoughnutChart from './doughnutChart';
import { useDispatch } from "react-redux";
import 'chartjs-adapter-date-fns';
import {getDataForToday,getDataForLastSevenDays,getDataForLastDay} from './utils'
const Dashboard = () => {
  const dispatch = useDispatch()
  const [totalExpense, setTotalExpense] = useState([])
  const data = useSelector((state) => state.users)
    const [expenseMessage, setExpenseMessage] = useState("");
    const navigate = useNavigate();
    const dataForToday = getDataForToday(totalExpense);
    const dataForLastDay = getDataForLastDay(totalExpense);
    const dataForLastSevenDays = getDataForLastSevenDays(totalExpense);
    const AddExpense = ()=>{
      navigate('/add-expense');
    }
    const fullExpense = ()=>{
      navigate('/wholeData');
    }
    console.log(data,'data')
    useEffect(() => {
      fetch('http://localhost:5000/get-expense', {
        method: 'POST', // Method should be uppercase
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.loggedInEmail
        })
      })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === 'Get expense successfully') {
          setTotalExpense(data.totalExpenses)
        } else {
          setExpenseMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
    }, [])
const options = {
  legend: {
    display: false,
    position: "right"
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  } 
};
  return <div>
  {totalExpense.length > 0 ? (
    <div className='barChartBlock'>
      <div className='graphcontainer'>
        <div>
        {dataForLastDay.length>0 || dataForLastSevenDays.length>0?(
        <div className='container' style={{ width: '650px', height: '400px' }}> 
          <BarGraph totalExpense={totalExpense} options={options} />
        </div>):(<div className='alternativeBarChart'><h3>Expense For Previous Week : </h3><b>There is no expense added for previous week.
        If you want to add any expense for previous week click the button given below.</b><br/><br/>
      <button type="submit" onClick={AddExpense} className='buttonClass1'>
          Add Expense
        </button></div>)}
        </div>
        <div>
        {dataForLastDay.length>0?(
        <div className='container' style={{ width: '600px', height: '400px' }}> 
          <DoughnutChart totalExpense={totalExpense} options={options} />
        </div>):(<div className='alternativeDoughnutChart'><h3>Expense For Previous Day : </h3><b>There is no expense added for previous day.
        If you want to add any expense for previous day click the button given below.</b><br/><br/>
      <button type="submit" onClick={AddExpense} className='buttonClass1'>
          Add Expense
        </button>
        </div>)}
      </div>
      </div>
      <div>
      {dataForToday.length>0 ?(
      <div>
        <TodayExpense  totalExpense={totalExpense} />
      </div>):(<div className='todayExpense'><h3>Today's Expense : </h3><b>There is no expense added for today day.</b><br/>
      <b>If you want to add any expense for today click the button given below.</b><br/><br/>
      <button type="submit" onClick={AddExpense} className='buttonClass1'>
          Add Expense
        </button>
      </div>)}
    </div>
    </div>
  ) : (
    <div className='alternative'>
      <h3>You haven't added any data yet.</h3>
      <b>If you want to add any expense click the button given below.</b><br/><br/>
      <button type="submit" onClick={AddExpense} className='buttonClass'>
          Add Expense
        </button>
    </div>
  )}
  <div className='FullExpense'>
    <i>If you want to see your whole expense data then click here </i>
    <button className='Button1' onClick={fullExpense}>Your Expense</button>
  </div>
</div>
}
export default Dashboard