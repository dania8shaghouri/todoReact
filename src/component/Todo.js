import Card from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function Todo({ todo, handleCheck }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const [showUpdateAlert, setshowUpdateAlert] = useState(false);
  const [updatedTodo, setupdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDelete() {
    setshowDeleteAlert(true);
  }

  function handleUpdateClick() {
    setshowUpdateAlert(true);
  }

  function handlDeleteClose() {
    setshowDeleteAlert(false);
  }
  function handlUpdateClose() {
    setshowUpdateAlert(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setshowUpdateAlert(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
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
          value={updatedTodo.title}
          onChange={(e) => {
            setupdatedTodo({ ...updatedTodo, title: e.target.value });
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
          value={updatedTodo.details}
          onChange={(e) => {
            setupdatedTodo({ ...updatedTodo, details: e.target.value });
          }}
        />

        <DialogActions>
          <Button onClick={handlUpdateClose}>اغلاق</Button>
          <Button onClick={handleUpdateConfirm}> تاكيد</Button>
        </DialogActions>
      </Dialog>
      {/* update diyalog */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography gutterBottom variant="h5" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <CreateOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleDelete}
                className="iconButton"
                sx={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
