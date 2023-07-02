import { ThemeProvider } from "./contextAPI/ThemeContext";
import Header from "./contextAPI/header";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;
