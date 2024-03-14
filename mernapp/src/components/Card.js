import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartDispatchContext, CartStateContext } from './ContextCart';


export default function Card(props) {

  const Data = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const priceRef = useRef();
 
  let option = props.option;
  let priseOption = Object.keys(option)
  // 1 default valu di
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("")

  const totalPrice = quantity * parseInt(option[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div>
        <div
          className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title ml-5">{props.foodItems.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-info rounded" onChange={(e) => setQuantity(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-info rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priseOption.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">
                Rs{totalPrice}/-
              </div>
            </div>
            <hr>
            </hr>
            <button className={'btn btn-info justify-center ms-2'} onClick={() => {
            let food = []
            for (const item of Data) {
              if (item.id === props.foodItems._id) {
                food = item;
        
                break;
              }
            }
            // console.log(food)
            // console.log(new Date())
            if (food !== "[]") {
              if (food.size === size) {
                dispatch({ type: "UPDATE", id: props.foodItems._id, price: totalPrice, quantity: quantity })
                return
              }
              else if (food.size !== size) {
                 dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: totalPrice, quantity: quantity, size: size,img: props.foodItems.img})
                // console.log("Size different so simply ADD one more to the list")
                return
              }
              return
            }
            dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: totalPrice, quantity: quantity, size: size,
            img: props.foodItems.img})
            // console.log(Data)
            }}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
