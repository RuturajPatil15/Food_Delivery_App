import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { TasksProvider } from "./components/ContextCart.js";
import MyOrder from "./screens/MyOrder.js";
// import Modal from "./screens/Modal.js";
// import Cart from "./screens/Cart.js";


function App() {
  return (
    //contextReducer ke fun ko yeaha se call kiya qki abhi ye cards cardprovider ke under rap kiye to ye global ban gaya hai matlab application me oo dispatch ko call karunga to dispatch kya hai oo patahoga stat ko call kiya to state kya hai oo pata hoga
<TasksProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            {/* <Route exact path="/Modal" element={<Modal />} />     */}
            {/* <Route exact path="/Cart" element={<Cart />} />           */}


          </Routes>
        </div>
      </Router>
</TasksProvider>

  );
}

export default App;
