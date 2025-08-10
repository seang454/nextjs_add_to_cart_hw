import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApi } from "./api/productsApi";
import cartReducer from "./features/counterSlice"; //default import
import { authKeycloakApi } from "./api/authKeycloakApi";
import authReducer from "./features/authKeycloakSlice"; //default import

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // persist only the cart slice
};

const rootReducer = combineReducers({
  cart: cartReducer, // Stores shopping cart items
  auth: authReducer, // Stores user login info
  [productsApi.reducerPath]: productsApi.reducer, // Add productsApi reducer
  [authKeycloakApi.reducerPath]: authKeycloakApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer); // rootReducer is your combined reducers

// This is like creating a big storage box for our entire app
export const store = configureStore({
  reducer: persistedReducer,
  // Middleware helps our APIs work properly (like helpers)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productsApi.middleware, // Helper for product API
      authKeycloakApi.middleware // Helper for authentication API
    ),
});

export const persistor = persistStore(store)
export type AppStore = typeof store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// export const persistor = persistStore(store);
// // These types help TypeScript understand our store structure
// export type RootState = ReturnType<typeof store.getState>; // What our store looks like
// export type AppDispatch = typeof store.dispatch; // How we send actions to store
