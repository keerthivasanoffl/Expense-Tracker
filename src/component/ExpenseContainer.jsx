import { useEffect, useState } from 'react'
import Form from './Form'
import History from './History'
import { v4 as uid } from 'uuid'
import BalanceContainer from './BalanceContainer'

function ExpenseContainer() {
  
  const [Expense, setExpense] = useState([])

  async function addExpense(title, amount) {
    setExpense([...Expense, { id: uid(), title, amount }])
    try {
      const newExpense = await fetch("http://localhost:3030/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount })
      })

      const result = await newExpense.json()
      console.log("API Response:", result)
    } catch (error) {
      console.error("Error saving expense:", error)
    }
  }
 
    async function getExpenses() {
    const response = await fetch("http://localhost:3030/get")
    const data = await response.json()
    setExpense(data)
  }

  useEffect(() => {
    getExpenses()
  }, [])

  async function deleteExpense(id) {
    await fetch(`http://localhost:3030/delete/${id}`, {
      method: "DELETE"
    })
    getExpenses()
  }

  return (
    <div className='expense-container'>
      <BalanceContainer expense={Expense} />
      <Form addExpense={addExpense} />
      <History expense={Expense} deleteExpense={deleteExpense} />
    </div>
  )
}

export default ExpenseContainer
