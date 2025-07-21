import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counters from "./features/counter.slice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCounterReducer = persistReducer(
  persistConfig,
  combineReducers({ counters })
);
export const store = configureStore({
  reducer: persistedCounterReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const makeStore = () => {
  if (typeof window === "undefined") {
    return configureStore({
      reducer: {
        counters,
      },
    });
  }
  return persistStore(store);
};
