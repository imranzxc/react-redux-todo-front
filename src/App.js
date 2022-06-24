import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, patchTodo, postTodos, removeTodo } from './features/todoSlice';
import './App.css';
import { ImPlus } from 'react-icons/im';
import { MdDoneOutline } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';

const App = () => {
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const loading = useSelector((state) => state.loading);
  const adding = useSelector((state) => state.adding);

  const dispatch = useDispatch();

  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTodo = () => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].text.toUpperCase() === text.toUpperCase()) {
        return false;
      }
    }

    if (text) {
      dispatch(postTodos(text));
      setText('');
      console.log(333333);
    }
    console.log(33);
  };
  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
    console.log(todos);
  };

  const patchDone = (todo) => {
    console.log(todo);
    dispatch(patchTodo(todo));
  };

  return (
    <div className="wrapper">
      <h1>Todo</h1>
      <div className="form">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div class="inputField">
            <input
              value={text}
              type="text"
              placeholder="Type your text..."
              onChange={(e) => setText(e.target.value)}
            />
            <div onClick={addTodo}>
              <button
                // disabled={!text || adding}
                className="inp"
                value={`${adding ? 'Добавляется...' : 'Добавить'}`}>
                <div>
                  <ImPlus />
                  <span className={`back ${text ? 'switch' : ''}`}>
                    <MdDoneOutline />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
      {
        todos.map((todo) => {
            return loading ? (
              <div class="loader">
                <div class="circle"></div>
              </div>
            ) : (
              <div className={`li todo ${todo.done ? 'done' : ''}`} key={todo._id}>
                <div className={`${todo.done ? 'change' : ''}`}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => patchDone(todo)}
                    checked={todo.done}></input>
                </div>

                <div className={`${todo.done ? 'text' : ''}`}>{todo.text}</div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className={`${todo.done ? 'display' : ''}`}
                  disabled={todo.disabled}>
                  <div className="deleteBtn">
                    <FiTrash />
                  </div>
                </button>
              </div>
            );
          })
      }
        {/* {loading ? (
          <div class="loader">
            <div class="circle"></div>
          </div>
        ) : (
          todos.map((todo) => {
            return loading ? (
              <div class="loader">
                <div class="circle"></div>
              </div>
            ) : (
              <div className={`li todo ${todo.done ? 'done' : ''}`} key={todo._id}>
                <div className={`${todo.done ? 'change' : ''}`}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => patchDone(todo)}
                    checked={todo.done}></input>
                </div>

                <div className={`${todo.done ? 'text' : ''}`}>{todo.text}</div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className={`${todo.done ? 'display' : ''}`}
                  disabled={todo.disabled}>
                  <div className="deleteBtn">
                    <FiTrash />
                  </div>
                </button>
              </div>
            );
          })
        )} */}
      </div>
    </div>
  );
};

export default App;
