import React, { useState, useEffect } from "react";
import TextField from "../../Components/TextField/index";
import CustomButton from "../../Components/Button/index";
import TodoList from "../../Components/List/TodoList";
import { settodoData, getAllTodos } from "../../services/todoServices";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { logoutUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const username = useSelector((state) => state.user?.user?.username);

  const handleInputChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(null);
    setLoading(true);

    if (!todo.trim()) {
      setShowAlert("Please enter a todo.");
      setLoading(false);
      setTodo("");
      return;
    }

    const todoData = {
      todo: todo,
    };

    try {
      const res = await settodoData(todoData);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTodo("");
    }
  };

  const getTodoList = async () => {
    setListLoading(true);
    try {
      const todos = await getAllTodos();
      setTodoList(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    getTodoList();
  }, [loading]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div>
            <h1 className="text-xl my-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Todo Application
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-5">
              Welcome {username} Add your todo here
            </p>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6 text-left"
              >
                <div>
                  <TextField
                    placeholder="Enter Your Todo"
                    type="text"
                    label="Todo"
                    name="todo"
                    value={todo}
                    onChange={handleInputChange}
                  />
                </div>
                {showAlert && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <span className="block sm:inline">{showAlert}</span>
                  </div>
                )}

                <div className="mt-4">
                  <CustomButton type="submit" label="Add Todo" />
                </div>
              </form>
              {listLoading ? (
                <div className="flex align-center justify-center">
                  <Loader />
                </div>
              ) : (
                <TodoList todoList={todoList} setTodoList={setTodoList} />
              )}
            </div>
          </div>
          <div className="mt-5">
            <button onClick={handleLogout} className="text-blue-500">
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Todo;
