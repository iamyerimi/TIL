import { useDispatch } from "react-redux";
import classes from "./Auth.module.css";
import { authActions } from "../store/auth";

const Auth = () => {
  // const [loggedIn, setLoggedIn]
  // const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  // const dispatch = useDispatch();
  // const loginHandler =() =>{
  //   dispatch(if(authActions.login()){
  //     setLo
  //   });
  // }
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault(); //브라우저가 HTTP요청을 보내는 걸 막음.
    dispatch(authActions.login());
  };
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
