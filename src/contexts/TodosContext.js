import { createContext, useContext, useReducer } from "react";
import TodosReducer from "../reducers/TodosReducer";

export const TodosContext = createContext([]);
export const DispatchContext = createContext([null]);

const TodosProvider = ({ childreen }) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);
  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {childreen}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};
export const useTodos = () => {
  return useContext(TodosContext);
};
export const useTodosDispatch = () => {
  return useContext(DispatchContext);
};
export default TodosProvider;
// export const TodosContext = createContext([]);
