import { useState } from "react";
import "./App.css";
import TodoList from "./component/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/TodosContext";

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
];

function App() {
  window.addEventListener("error", (e) => console.log("JS Error:", e.message));
  window.addEventListener("unhandledrejection", (e) =>
    console.log("Promise Error:", e.reason)
  );

  const [todos, setTodos] = useState(initialtodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
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
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
