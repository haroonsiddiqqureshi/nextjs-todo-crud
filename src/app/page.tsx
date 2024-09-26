"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const updateComplateTodoStatus = async (id: string, status: boolean) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !status }),
        cache: "no-store",
      });

      if (res.ok) {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !status } : todo
          )
        );
      } else {
        console.log(`Failed to update todo status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });

      if (res.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      } else {
        console.log(`Failed to delete todo: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/todo/", {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();

      if (res.ok) {
        setTodos(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function formatDate(input: string): string {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-end mb-4">
        <Link
          href="/create"
          className="px-4 py-2 font-bold text-purple-400 hover:text-purple-500 rounded-md bg-pastel-purple hover:bg-pastel-purple-dark shadow-lg transition"
        >
          Add Task
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {todos.map((task) => (
          <div
            key={task._id}
            className="w-full p-4 bg-white rounded-lg shadow-lg"
          >
            <h1
              className={`text-2xl mb-1 font-bold text-gray-800 ${task.completed ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </h1>
            <p className="mb-1 font-semibold text-gray-600">{task.description}</p>
            <span className="text-xs font-medium text-gray-500">
              Due Date: {formatDate(task.dueDate)}
            </span>
            <div className="flex justify-between gap-2 mt-3">
              <button
                onClick={() => updateComplateTodoStatus(task._id, task.completed)}
                className="flex-1 px-4 py-2 font-bold text-emerald-500 hover:text-emerald-600 bg-pastel-green hover:bg-pastel-green-dark rounded-md text-sm transition"
                type="button"
              >
                Done
              </button>
              <div className="flex gap-2">
                <Link
                  className="px-4 py-2 font-bold text-yellow-500 hover:text-yellow-600 bg-pastel-yellow hover:bg-pastel-yellow-dark rounded-md text-sm transition"
                  href={`/edit/${task._id}`}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="px-4 py-2 font-bold text-red-500 hover:text-red-600 bg-pastel-red hover:bg-pastel-red-dark rounded-md text-sm transition"
                  onClick={() => deleteTodo(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}