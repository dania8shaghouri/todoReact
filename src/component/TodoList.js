import Card from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";
// import component
import Todo from "./Todo";
import { useContext, useEffect, useState } from "react";
// others
import { TodosContext } from "../contexts/TodosContext";

export default function TodoList() {
  const [titleInput, settitleInput] = useState("");
  const { todos, setTodos } = useContext(TodosContext);
  const [displayedTodosType, setdisplayedTodosType] = useState("all");

  // fillteration arrays
  const copletedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCopletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todosToBeRender = todos;
  if (displayedTodosType === "completed") {
    todosToBeRender = copletedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRender = notCopletedTodos;
  } else {
    todosToBeRender = todos;
  }
  const todosJsx = todosToBeRender.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const strogeTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(strogeTodos);
  }, []);

  function changeDisplayedType(e) {
    setdisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    settitleInput("");
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ backgroundColor: "white", height: "100vh" }}
      style={{ maxHeight: "80vh", overflow: "scroll" }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            مهامي
          </Typography>
          <Divider />

          <ToggleButtonGroup
            value={displayedTodosType}
            onChange={changeDisplayedType}
            aria-label="todo filter"
            style={{
              direction: "ltr",
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
            color="primary"
          >
            <ToggleButton value="non-completed" key="three">
              الغير المنجز
            </ToggleButton>
            <ToggleButton value="completed" key="two">
              المنجز
            </ToggleButton>
            <ToggleButton value="all" key="one">
              الكل
            </ToggleButton>
          </ToggleButtonGroup>
        </CardContent>

        {todosJsx}

        <Grid container sx={{ marginTop: 3 }} spacing={2}>
          <Grid
            size={8}
            display="flex"
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <TextField
              value={titleInput}
              onChange={(e) => {
                settitleInput(e.target.value);
              }}
              label="عنوان المهمه"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid
            size={4}
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Button
              onClick={handleAddClick}
              style={{ width: "100%", height: "100%" }}
              variant="contained"
              disabled={titleInput.length === 0}
            >
              اضافه
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
