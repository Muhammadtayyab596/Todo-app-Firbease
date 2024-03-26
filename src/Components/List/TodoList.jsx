import React, { useState } from "react";
import { deleteTodoData } from "../../services/todoServices";
import Loader from "../Loader";

const TodoList = ({ todoList, setTodoList }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (todoId) => {
    setLoading(true);
    try {
      await deleteTodoData(todoId);
      setTodoList(todoList.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex align-center justify-center">
          <Loader />
        </div>
      ) : (
        <ul className="space-y-4 text-left text-gray-500 dark:text-xgray-400">
          {todoList?.map((todo) => (
            <li
              key={todo?.id}
              className="flex items-center justify-between space-x-3 rtl:space-x-reverse"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>{todo?.todo}</span>
              </div>
              <svg
                className="fill-current h-6 w-6 text-red-500 cursor-pointer"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => handleDelete(todo.id)}
              >
                <title>Delete</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
