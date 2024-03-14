import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../screens/Modal';
import Cart from '../screens/Cart';
import { createPortal } from 'react-dom';
import { CartStateContext } from './ContextCart';
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const LogoutClick = () => {
    localStorage.removeItem("authToken")
    navigate("/login")

  }
const Item = useContext(CartStateContext);
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" to="/">Food's</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-3">
                <li className="nav-item">
                  <Link className="nav-link active fs-5 mt-3" aria-current="page" to="/">Home</Link>
                </li>

                {(localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active fs-5 mt-3" aria-current="page" to="/myOrder">My Orde's</Link>
                  </li>
                  : ""}
              </ul>

       
              {(!localStorage.getItem("authToken")) ?
                <div className='d-flex'>
                  <Link className="btn bg-white text-info mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white text-info mx-1" to="/signup">SignUp</Link>
                </div>
                :
                <div>
                  <button className="btn bg-white text-info mx-1" onClick={() =>  setCartView(true) } >
                    {/* MyCart */}
                    <FaShoppingCart />{" "}
                    <Badge pill bg='danger'>{Item.length}</Badge>
                  </button> 
                    {cartView && createPortal( 
                    <Modal onClose={() => setCartView(false)}><Cart/></Modal>,
                    document.body
                     )}
                  <button className="btn border-white text-white mx-1" onClick={LogoutClick}>
                    Logout
                  </button>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
