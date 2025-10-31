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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodos, useTodosDispatch } from "../contexts/TodosContext";
// import component
import Todo from "./Todo";
import { useEffect, useMemo, useState, useReducer } from "react";
// others

import { useToast } from "../contexts/ToastContext";

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  // const { todos2, setTodos } = useContext(TodosContext);
  const [diyalogTodo, setdiyalogTodo] = useState(null);
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const [showUpdateAlert, setshowUpdateAlert] = useState(false);
  const [titleInput, settitleInput] = useState("");
  const [displayedTodosType, setdisplayedTodosType] = useState("all");
  const { showHideToast } = useToast();
  // fillteration arrays

  const copletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCopletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRender = todos;
  if (displayedTodosType === "completed") {
    todosToBeRender = copletedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRender = notCopletedTodos;
  } else {
    todosToBeRender = todos;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function changeDisplayedType(e) {
    setdisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    dispatch({ type: "added", payload: { newTitle: titleInput } });
    showHideToast(" تمت الاضافه بنجاح");
    settitleInput("");
  }

  // delete
  function openDeleteAlert(todo) {
    setdiyalogTodo(todo);
    setshowDeleteAlert(true);
  }

  function handlDeleteClose() {
    setshowDeleteAlert(false);
  }
  function handleDeleteConfirm() {
    dispatch({ type: "delete", payload: { id: diyalogTodo.id } });
    setshowDeleteAlert(false);
    showHideToast("تم الحذف");
  }
  // end delete

  // update diyalog
  function openUpdateAlert(todo) {
    setdiyalogTodo(todo);
    setshowUpdateAlert(true);
  }

  function handlUpdateClose() {
    setshowUpdateAlert(false);
  }

  function handleUpdateConfirm() {
    dispatch({ type: "update", payload: diyalogTodo });
    setshowUpdateAlert(false);
    showHideToast("تم التحديث");
  }
  // end update diyalog

  const todosJsx = todosToBeRender.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteAlert}
        showUpdate={openUpdateAlert}
      />
    );
  });

  return (
    <>
      {/* update diyalog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handlUpdateClose}
        open={showUpdateAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمه</DialogTitle>

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="عنوان المهمه"
          fullWidth
          variant="standard"
          value={diyalogTodo?.title}
          onChange={(e) => {
            setdiyalogTodo({ ...diyalogTodo, title: e.target.value });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label=" التفاصيل"
          fullWidth
          variant="standard"
          value={diyalogTodo?.details}
          onChange={(e) => {
            setdiyalogTodo({ ...diyalogTodo, details: e.target.value });
          }}
        />

        <DialogActions>
          <Button onClick={handlUpdateClose}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm}> تاكيد</Button>
        </DialogActions>
      </Dialog>
      {/* update diyalog */}

      {/* delete modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handlDeleteClose}
        open={showDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف المهمه
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع بعد الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlDeleteClose}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm}> نعم</Button>
        </DialogActions>
      </Dialog>
      {/* delete modal */}

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
    </>
  );
}
