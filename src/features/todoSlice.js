import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  adding: false,
};

export const fetchTodos = createAsyncThunk('todos/fetch', async (_, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:4200/todos');
    const data = await res.json();
    return await data.reverse();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postTodos = createAsyncThunk('todos/post', async (text, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:4200/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    });
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const removeTodo = createAsyncThunk('todos/delete', async (id, thunkAPI) => {
  try {
    await fetch(`http://localhost:4200/todos/${id}`, {
      method: 'DELETE',
    });
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const patchTodo = createAsyncThunk('todos/patch', async (todo, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4200/todos/${todo._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: !todo.done,
      }),
    });
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// export const del = createAction("del");

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.adding = false;
        state.loading = false;
      })
      .addCase(postTodos.pending, (state, action) => {
        state.adding = true;
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.todos = state.todos.map((todo) => {
          console.log(action);
          if (todo._id === action.meta.arg) {
            todo.disabled = true;
          }
          return todo;
        });
        state.loading = true;
      })
      .addCase(patchTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload
          }
          return todo;
        });
        state.loading = false;
      });
  },
});
export default todosSlice.reducer;