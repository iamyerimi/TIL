import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const dropdownChangeHanler = (event) => {
    // console.log(event.target.value);


    // dropdown에서 선택된 value는 props를 통해 부모 컴포넌트(Expenses)에 전달됨, 부모로부터 받은 값임. 양방향 바인딩 했음.
    // Expenses에서 filteredYear를 전달하고, 그 상태값은 props를 통해 ExpensesFilter로 들어감.
    props.onChangeFilter(event.target.value);
    
  };



  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHanler}>
          <option value="2022">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
