import { useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ViewExpenseModal from "@/components/modals/ViewExpenseModal";

function ExpenseCategoryItems({ title, color, total }) {
    //console.log("expense", {title, color, total});
    const [showViewExpenseModal, setsShowViewExpenseModal] = useState(false);
  return (
    <>
    {/* <ViewExpenseModal show={showViewExpenseModal} onClose={setsShowViewExpenseModal} expense={expense}/> */}
    <button onClick={() => {setsShowViewExpenseModal(true)}}>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-full">
        <div className="flex items-center gap-2 py-3">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <div className="capitalize">{title}</div>
        </div>
        <p>{currencyFormatter(total)}</p>
      </div>
    </button>
    </>
  );
}

export default ExpenseCategoryItems;
