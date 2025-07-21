import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Counter } from "../types/counter";
import { v4 } from "uuid";
import moment from "moment";

interface countersState {
  data: Counter[];
}

const initialState: countersState = { data: [] };

export const countersSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    createCounter(
      state,
      action: PayloadAction<Omit<Counter, "id" | "resets">>
    ) {
      state.data.push({
        id: v4(),
        resets: [],
        ...action.payload,
      });
    },
    sort(state, action: PayloadAction<string>) {
      state.data.sort((a, b) => {
        if (action.payload === "DESC") return b.title.localeCompare(b.title);
        return a.title.localeCompare(b.title);
      });
    },
    resetCounter(state, action: PayloadAction<string>) {
      const index = state.data.findIndex((s) => s.id === action.payload);
      const prev = [...state.data[index].resets];
      prev.push({
        createDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      state.data[index].resets = prev;
    },
    deleteCounter(state, action: PayloadAction<string>) {
      const index = state.data.findIndex((s) => s.id === action.payload);
      state.data = state.data.toSpliced(index, 1);
    },
  },
});

export const countersActions = countersSlice.actions;
export default countersSlice.reducer;
