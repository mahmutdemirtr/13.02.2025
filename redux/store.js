import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import emailReducer from '@/features/email/emailSlice';
import instaDataReducer from '@/features/instaData/instaDataSlice';
import priceCountReducer from '@/features/PricingPlan/PricingPlanSlice';

// Persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage mechanism (localStorage by default)
  whitelist: ['email', 'instaData', 'priceCount'], // Persist these slices
};

// Create persisted reducers
const persistedEmailReducer = persistReducer(persistConfig, emailReducer);
const persistedInstaDataReducer = persistReducer(persistConfig, instaDataReducer);
const persistedPriceCountReducer = persistReducer(persistConfig, priceCountReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    email: persistedEmailReducer,
    instaData: persistedInstaDataReducer,
    priceCount: persistedPriceCountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);