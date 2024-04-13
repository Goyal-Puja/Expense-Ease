import React, { useRef, useContext } from "react"

import {currencyFormatter} from '@/lib/utils'
import Modal from '@/components/Modal'
import { financeContext } from '@/lib/store/finance-context'
import { FaRegTrashAlt } from 'react-icons/fa';
import { authContext } from '@/lib/store/auth-context'

export default function AddIncomeModal({ show , onClose }){
    const amountRef = useRef();
    const descriptionRef = useRef();
    const { income, addIncomeItem, removeIncomeItem }  = useContext(financeContext);
 
    const { user } = useContext(authContext);
    const addIncomeHandler = async (e) => {
      e.preventDefault();

      const newIncome = {
        amount: +amountRef.current.value,
        description: descriptionRef.current.value,
        createdAt: new Date(),
        uid: user.uid
      };
      try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      } catch (error){
        console.log(error);
      }
    };

    const deleteIncomeEntryHandle = async (incomeId) => {


        try{
              await removeIncomeItem(incomeId);
        } catch (error){
            console.log(error);
        }
    }
    return(
        <Modal show={show} onClose={onClose}>
        <form onSubmit={addIncomeHandler} className='flex flex-col gap-4 ml-6 mr-6'>
          <div className='flex flex-col gap-4'>
          <label htmlFor='amount'>Income amount</label>
          <input className="px-4 py-2 bg-slate-600 rounded-xl" type='number' name='amount' ref={amountRef} min={0.01} step={0.01} placeholder='Enter income amount'></input>
          </div>
          
          <div className='flex flex-col gap-4'>
          <label htmlFor='description'>Description</label>
          <input className="px-4 py-2 bg-slate-600 rounded-xl" type='text' name='description' ref={descriptionRef} placeholder='Enter income description'></input>
          </div>
          <button className='btn btn-primary'>Add Entry</button>
        </form>
        <div className='flex flex-col gap-4 mt-6 ml-3 mr-3'>
          <h3 className='text-2xl font-bold text-center'>Income History</h3>
          
              {income.map((i) => {
                return (
                  <div className="flex justify-between items-center" key={i.id}>
                    <div>
                      <p className='font-semibold'>{i.description}</p>
                      <small className='text-xs'>{i.createdAt.toISOString()}</small>
                    </div>
                    <p className='flex items-center gap-2'>{currencyFormatter(i.amount)}
                    <button onClick={() => { deleteIncomeEntryHandle(i.id)}}><FaRegTrashAlt/></button>
                    </p>
                    </div>
                )
              })}
        </div>
        </Modal>
    );
}
