"use client"

import Modal from "@/components/Modal";
import { useContext, useState, useRef, use } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { v4 as uuidv4 } from "uuid";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const { expense, addExpenseItem, addCategory } = useContext(financeContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const { user } = useContext(authContext);
  console.log("user", user.uid);

  const titleRef = useRef()
  const colorRef = useRef();

  const addExpenseItemHandler = async () => {
    const exp = expense.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: exp.color,
      title: exp.title,
      total: exp.total + +expenseAmount,
      items: [
        ...exp.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };
    try{
        await addExpenseItem(selectedCategory, newExpense);
        console.log(newExpense);
        setExpenseAmount("");
        setSelectedCategory(null);
        onClose();
    } catch (error){
       console.log(error);
    }
  };

  const addCategoryHandler = async () => {
    console.log("Add Category")
    const title = titleRef.current.value;
    const color = colorRef.current.value;
    try {
        await addCategory({title, color, total: 0})
        setShowAddExpense(false);
    } catch (error){
       console.log(error.message);
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4 mr-4 ml-4">
        <label>Enter an amount</label>
        <input
          className="px-4 py-2 bg-slate-600 rounded-xl"
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter Expense Amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center justify-between ml-4 mr-4"> 
                <h3 className="text-2xl capitalize">Select Expense Category</h3>
                <button className="text-lime-400" onClick={() => {setShowAddExpense(true)}}>+ New Category</button>
            </div>
            {showAddExpense && (
                <div className="flex items-center justify-between ml-4 mr-4">
                <input className="px-4 py-2 bg-slate-600 rounded-xl" type="text" placeholder="Enter Title" ref={titleRef}/>
                <label>Pick Color</label>
                <input className="px-4 py-2 bg-slate-600 rounded-xl w-24 h-10" type="color" ref={colorRef}/>
                <button className="btn btn-primary-outline" onClick={addCategoryHandler}>Create</button>
                <button className="btn btn-danger" onClick={() => {setShowAddExpense(false)}}>Cancel</button>
                </div> )
            }
           
          {expense.map((expense) => (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl mr-4 ml-4"
                >
                  <div className="flex items-center gap-2" key={expense.id}>
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: expense.color }}
                    ></div>
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            ))}
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6 ml-4">
            <button className="btn btn-primary" onClick={addExpenseItemHandler}>
          Add Expense
        </button>
        </div>
        
      )}
    </Modal>
  );
}
export default AddExpensesModal;
