// 과제1
// 1. 지출 표시를 담당하는 새 컴포넌트를 생성하세요.
// 2. 해당 컴포넌트에 여러 개의 ExpenseItem 컴포넌트를 추가하세요.
// 3. 앱 컴포넌트에 지출 데이터를 그대로 유지하면서 해당 데이터를 새로 생성한 컴포넌트로 전달하세요.

import Card from "./Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses(props) {
  <div></div>;
  return (
    <Card className="expenses">
      <ExpenseItem
        title={props.items[0].title} // 점 뒤의 부분은 프로퍼티의 이름과 일치해야 한다. (이 객체들에 접근하고 있기 때문.)
        amount={props.items[0].amount}
        date={props.items[0].date}
      />
      <ExpenseItem
        title={props.items[1].title}
        amount={props.items[1].amount}
        date={props.items[1].date}
      />
      <ExpenseItem
        title={props.items[2].title}
        amount={props.items[2].amount}
        date={props.items[2].date}
      />
      <ExpenseItem
        title={props.items[3].title}
        amount={props.items[3].amount}
        date={props.items[3].date}
      />
    </Card>
  );
}

export default Expenses;
