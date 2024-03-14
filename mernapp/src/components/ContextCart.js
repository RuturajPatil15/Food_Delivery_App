import { createContext, useReducer } from 'react';

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, {
        id: action.id,
        name: action.name,
        price: action.price,
        quantity: action.quantity,
        size: action.size,
        img: action.img
      }];
    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;
    case "UPDATE":
      let arr = [...state]
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(food.quantity, parseInt(action.quantity), action.price + food.price)
          arr[index] = { ...food, quantity: parseInt(action.quantity) + food.quantity, price: action.price + food.price }
        }
        return arr
      })
      return arr
    case "DROP":
      let EmptyArray = []
      return EmptyArray
      
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}











// import React, { createContext, useReducer } from 'react'
// import App from '../App';
// // import Home from '../screens/Home';


// export const StateContext = createContext(null);
// export const DispatchContext = createContext(null);

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD":
//       return [...state, { id: action.id, name: action.name, prise: action.prise, quantity: action.quantity, size: action.size, img: action.img }]

//     default:
//       console.log("Erron in Reducer")
//   }
// }

// export default function ContextCart () {

//   const [state, dispatch] = useReducer(reducer,[]);
//   return (
//     <DispatchContext.Provider value={dispatch}>
//       <StateContext.Provider value={state}>
//         <App />
//       </StateContext.Provider>
//     </DispatchContext.Provider>
//   )
// }


