import React from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {

    // enteredExpenseData: ExpenseForm에서 들어온 새로운 expenseData
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log(expenseData);
    props.onAddExpense(expenseData);
  };
  
  return (
    <div className="new-expense">

        {/* 함수 자체를 가리키기만 함. 이 saveExpenseDataHandler함수 자체가 ExpenseForm으로 전달된다. */}
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
