import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  // const [showfinished, setshowfinished] = useState(true);
  // Load todos from localStorage on initial render

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever `todos` changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => setTodo(e.target.value);

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleEdit = (id) => {
    const task = todos.find((item) => item.id === id);
    if (task) {
      setTodo(task.todo);
      setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
    }
  };

  const handleAdd = () => {
    if (todo.trim() === "") {
      alert("Please enter a todo!");
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), todo, isCompleted: false },
    ]);
    setTodo("");
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-3xl">iTask - Manage your todo at one place.</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold ">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full px-5 py-1"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md  mx-6 font-bold"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 ? (
            <div className="m-5">No Todos to display</div>
          ) : (
            todos.map((item) => (
              <div
                key={item.id}
                className="todo flex w-1/4 my-3 justify-between"
              >
                <div className="flex gap-5">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 "
                  ><FaEdit/>
                  
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold"
                  ><AiFillDelete/>
                    
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
