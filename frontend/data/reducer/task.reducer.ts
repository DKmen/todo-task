import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import STATUS from '../../constant/status';
import axios from 'axios';

const URL = 'http://localhost:4000/api/v1/task/'

export enum Status {
    New = "New",
    Working = "Working",
    Done = "Done"
}

export interface ITask {
    id: string,
    name: string,
    description: string,
    status: Status
}

export interface IState {
    task: ITask[],
    status: STATUS
}

const initialState: IState = {
    task: [],
    status: STATUS.IDLE,
}

export const fetchTask = createAsyncThunk('task/fetchTask', async () => {
    return (await axios.get(URL)).data.data;
})

export const addTask = createAsyncThunk('task/addTask', async (task: Partial<ITask>) => {
    return (await axios.post(URL, task)).data.data;
})

export const deleteTask = createAsyncThunk('task/deleteTask', async ({ id, index }: { id: string, index: number }) => {
    await axios.delete(URL + id);
    return index;
})

export const editTask = createAsyncThunk('task/editTask', async (task: Partial<ITask> & { id: string, index: number }) => {
    const updatedTask = (await axios.patch(URL + task.id, {
        name: task.name,
        description: task.description,
        status: task.status
    })).data.data;

    return { index: task.index, task: updatedTask }
})

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.task = action.payload;
                state.status = STATUS.IDLE;
            })
            .addCase(fetchTask.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchTask.rejected, (state) => {
                state.status = STATUS.ERROR;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.task = [...state.task, action.payload];
                state.status = STATUS.IDLE;
            })
            .addCase(addTask.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(addTask.rejected, (state) => {
                state.status = STATUS.ERROR;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = action.payload;
                state.task.splice(index, 1);
                state.task = [...state.task];
                state.status = STATUS.IDLE;
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(deleteTask.rejected, (state) => {
                state.status = STATUS.ERROR;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const index = action.payload.index;
                state.task[index] = action.payload.task
                state.task = [...state.task];
                state.status = STATUS.IDLE;
            })
            .addCase(editTask.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(editTask.rejected, (state) => {
                state.status = STATUS.ERROR;
            })
    }
})

export const taskReducer = taskSlice.reducer