import Card from "./Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

// 1. 여기 props 객체에서 key: value로 이루어진 파일 포맷을 받는다.
function ExpenseItem(props) {
  // 2. 때문에 아래의 상수 세 개는 제거할 수 있다.
  //   const expenseDate = new Date(2021, 2, 28); //월 필드는 0에서 시작
  //   const expenseTitle = 'Car Insurance';
  //   const expenseAmount = 294.67;

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} amount={props.amount} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">{props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
