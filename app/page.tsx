"use client";

import {currencyFormatter} from '@/lib/utils'

import ExpenseCategoryItems from '@/components/ExpenseCategoryItems'
import { useContext, useEffect, useState } from 'react';
import  AddIncomeModal from '@/components/modals/AddIncomeModal'
import AddExpensesModal from '@/components/modals/AddExpensesModal'
import { financeContext} from '@/lib/store/finance-context'
import { authContext } from '@/lib/store/auth-context'
import SignIn from "@/components/SignIn"

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { title } from 'process';
import { color } from 'chart.js/helpers';

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Home() {
  
  
    const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [balance, setBalance] = useState(0);

     const { expense, income } = useContext(financeContext);
     const { user } = useContext(authContext);

    
    useEffect(() => {
        const newBalance = income.reduce((total, i) => {
            return total + i.amount;
        }, 0) - expense.reduce((total, e)=> {
          return total + e.total;
        }, 0);
        setBalance(newBalance);
    }, [expense, income]);

    if(!user){
      return <SignIn/>
    }

  return (
    <>
    <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />   
    <AddExpensesModal show={showAddExpenseModal} onClose={setShowAddExpenseModal}/>

    <main className="container max-w-2xl px-6 mx-auto">
     <section>
      <small className="text-gray-400 text-md">My Balance</small>
      <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
    </section>

    <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary" onClick={() => {setShowAddIncomeModal(true)}}>+ Income</button>
        <button className="btn btn-primary btn-primary-outline" onClick={() => {setShowAddExpenseModal(true)}}>+ Expenses</button>
    </section>


<section className='py-6'>
      <h3 className='text-2xl'>My Expenses</h3>
      <div className='flex flex-col gap-4 mt-6'>
        {expense.map((ex) => {
 return <ExpenseCategoryItems key={ex.id} title={ex.title} color={ex.color} total={ex.total}/>
})}
      </div>
  </section>
  <section>
    <h3></h3>
  </section>

<section className='py-6'>
  <h3 className='text-2xl'>Stats</h3>
  <div className='w-1/2 mx-auto'>
    <Doughnut data={{
      labels: expense.map((ex) => ex.title),
      datasets: [
        {
          label: "Expenses",
          data: expense.map((ex) => ex.total),
          backgroundColor: expense.map((ex) => ex.color),
          borderColor: ['#18181b'],
          borderWidth: 5
        }
      ]
    }}/>
  </div>
</section>


    </main>
   </>
  );
}
