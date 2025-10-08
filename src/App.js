import { useState } from "react";
import "./App.css";
import TodoList from "./component/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexander"],
  },
  palette: {
    primary: {
      main: "#d50000",
    },
  },
});
const initialtodos = [
  {
    id: uuidv4(),
    title: "قراءه كتاب",
    details: "بيسلرسيبرسيبر",
    isCompleted: false,
  },
  // {
  //   id: uuidv4(),
  //   title: "قراءه كتاب",
  //   details: "بيسلرسيبرسيبر",
  //   isCompleted: false,
  // },
  // {
  //   id: uuidv4(),
  //   title: "قراءه كتاب",
  //   details: "بيسلرسيبرسيبر",
  //   isCompleted: false,
  // },
];

function App() {
  const [todos, setTodos] = useState(initialtodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",
          fontFamily: "Alexander",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
