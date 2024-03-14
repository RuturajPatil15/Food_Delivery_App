import React, { useContext } from 'react'
import { CartStateContext, CartDispatchContext } from '../components/ContextCart';
import { FaRegTrashCan } from "react-icons/fa6";


export default function Cart() {
  let data = useContext(CartStateContext);
  let dispatch = useContext(CartDispatchContext);
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>Cart is Empty!</div>
      </div>
    )
  }

  const HandleCheckOut = async () => {
    let userEmail = localStorage.getItem("UserEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::", response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }


  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className='table table-striped table-hover'>
          <thead className='text-info fs-4'>
            <tr>
              <th scope='col'>sr.no</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>

          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><FaRegTrashCan  onClick={() => { dispatch({ type: "REMOVE",
                 index: index }) }} />
                  {/* <td ><button type="button" className="btn p-0"><img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /> */}
                </button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-info mt-5' onClick={HandleCheckOut}> Check Out </button>
        </div>
      </div>

    </div>
  )
}

