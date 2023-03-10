import { initializeApp, firestore } from "firebase/app";
import "firebase/firestore";
import { ExpenseService } from "./expense.service";
import { ProjectService } from "./project.service";

const firebaseConfig = {
  apiKey: "AIzaSyBhDfvi0lKDj-8bHCYYjci2PnsLbM9GXUk",
  authDomain: "kipsi-challenge.firebaseapp.com",
  projectId: "kipsi-challenge",
  storageBucket: "kipsi-challenge.appspot.com",
  messagingSenderId: "1086925729964",
  appId: "1:1086925729964:web:a92425c2e58cc796a56f09",
};

const app = initializeApp(firebaseConfig);
export default app;

let _db: firestore.Firestore;
export const getDb = () => {
  if (!_db) {
    _db = firestore();
  }
  return _db;
};

export const getProjectService = () => ProjectService.getInstance(getDb());
export const getExpenseService = () => ExpenseService.getInstance(getDb());
