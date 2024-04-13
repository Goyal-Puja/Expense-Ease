"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

import { authContext } from "@/lib/store/auth-context";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from "firebase/firestore";

export const financeContext = createContext({
  income: [],
  expense: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {}
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const { user } = useContext(authContext);

  const addCategory = async (category) => {
    try {
        const collectionRef = collection(db, "expenses");
        const docSnap = await addDoc(collectionRef, {
            uid: user.uid,
            ...category,
            items: [],
        });
        setExpense(prevExpense => {
            return [
                ...prevExpense,
                {
                    id: docSnap.id,
                    uid: user.uid,
                    items: [],
                    ...category
                }
            ]
        })
    } catch (error){
         throw error;
    }
  }

//  const { user } = useContext(authContext);

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);
    try{
    await updateDoc(docRef, {...newExpense})
    setExpense(prevState => {
        const updatedExpenses = [...prevState]
        const foundIndex = updatedExpenses.findIndex(expense => {
            return expense.id === expenseCategoryId
        })
        updatedExpenses[foundIndex] = {id: expenseCategoryId, ...newExpense}
        return updatedExpenses;
    })
    } catch (error){

    }
};

  

  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const values = { income, expense, addIncomeItem, removeIncomeItem, addExpenseItem, addCategory };

  useEffect(() => {
    if(!user)
    return;
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const q = query(collectionRef, where("uid", '==', user.uid));
      const docsSnap = await getDocs(q);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const q = query(collectionRef, where("uid", '==', user.uid));
      const docsSnap = await getDocs(q);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setExpense(data);
    };

    getIncomeData();
    getExpensesData();
  }, [user]);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
