import { configureStore } from "@reduxjs/toolkit";
import saAuthReducer from "@/store/selleradmin/AuthSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Configure persist
const persistConfig = {
    key: "root", // Key for the persisted state in storage
    storage,
};

// Combine reducers if you have multiple
const rootReducer = combineReducers({
  saAuth: saAuthReducer, // Add other reducers here
});

// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });
  
  // Create persistor
  export const persistor = persistStore(store);
  export default store;