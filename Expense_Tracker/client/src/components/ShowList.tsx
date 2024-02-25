import { useEffect, useState } from "react"
import IDataList from "../models/IDataList";
import { getItemsFromServer } from "../services/ItemService";
import ExpenseTracker from "./ExpenseTracker";

export default function ShowList(){

const [items,setItems] = useState<IDataList[]>([]);
const [error, setError] = useState<Error | null>(null);
const [sum, setSum] = useState<number | null>(0);
const [rahulSpent, setRahulSpent] = useState<number>(0);
const [rameshSpent, setRameshSpent] = useState<number>(0);
const [showForm, setShowForm] = useState<boolean>(false);

useEffect( () => {

    const fetchMenu = async () => {
        try{
            const data = await getItemsFromServer();
            console.log(data);
            setItems(data);
            setSum(data.reduce((result,v) =>  result + v.price , 0 ))
            calculateShares(data);
        }
        catch(error: any){
            console.error(error);
            setError(error);
        }
    }
    fetchMenu();

},[showForm]);

const calculateShares = (data: IDataList[]) => {
    
    var rahulspent1 : number = 0
    var rameshspent1 : number = 0
    data.map(
        dt => (
            dt.payeeName === "Rahul" ? 
            (rahulspent1 = rahulspent1 + dt.price):(rameshspent1 = rameshspent1 + dt.price)
        )
    )
    console.log("rahul Spent ",rahulspent1);
    console.log("ramesh  Spent ",rameshspent1);
    setRahulSpent(rahulspent1);
    setRameshSpent(rameshspent1);
}

const getTableHeaders = () => {
    return (
        <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
        </>
    )
}

const renderExpense = (expense:IDataList) => {
    return (<div key={expense.id}>
        <div className="use-inline date">{expense.setDate}</div>
        <div className="use-inline">{expense.product}</div>
    <div className="use-inline price">{expense.price}</div>
    <div className={`use-inline ${expense.payeeName}`}>{expense.payeeName}</div>
    </div>)
}
const renderSummary = () => {
    return (
        <>
        <div className="use-inline">Total</div>
        <div className="use-inline total">{sum}</div><br/>
        <div className="use-inline">Rahul paid: </div>
        <div className="use-inline total Rahul">{rahulSpent}</div><br/>
        <div className="use-inline ">Ramesh paid: </div>
        <div className="use-inline total Ramesh">{rameshSpent}</div> <br />
        <div className="use-inline payable">{rahulSpent>rameshSpent? "Pay to Rahul " : "Pay to Ramesh"}</div>
        <div className="use-inline payable price"> {Math.abs((rahulSpent-rameshSpent)/2)}</div>

        {
               error && (
                    <>
                        {error?.message}
                    </>
                )
            } 
        </>
    )
}


return (
    <>
        <header id="page-Header"> Expense Tracker</header>
        <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>

        {
                showForm && (
                    <div className="form">
                        <ExpenseTracker onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTracker>
                    </div>
                )
            }

        {getTableHeaders()}
        {items && items.map((expense)=>renderExpense(expense))}
        <hr/>
        {renderSummary()}
    </>
)
}