import Card from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({ type: "toggledCompleteds", payload: todo });
    showHideToast("تم التعديل بتجاح");
  }

  function handleDelete() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  return (
    <>
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
