import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

export default function Home() {
    
    const [search,setSearch] = useState("")
    const [foodItems, setfoodItems] = useState([])
    const [foodCategory, setfoodCategory] = useState([])
  
    const loadDAta = async () => {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      const json = await response.json();
      setfoodItems(json[0]);
      setfoodCategory(json[1]);
      //array mese single element ko access karne ke liya ye aise kiya q ki humne oo data array me dala hai
      // console.log(json[0], json[1])
    }
  
    //loadData ko call karne ke liye useEffect ka use kiya
    useEffect(() => {
      loadDAta();
      //ye fun muze ek hi bar chalana hai is liye empty [] bracket diya qki usme dipendancy us state ki dalni hai matlab footer me kuch change hga tabhi hi mujhe us fun ko chedna hai 
    }, [])
  
  
  
  
    return (
      //crausel ko direct yeaha par hi dala q ki search bar banana tha
      <div>
        <div>  <Navbar /></div>
  
        <div> 
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
  
          <div className="carousel-inner" id='carousel'>
  
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success text-white bg-info" type="submit">Search</button> */}
              </div>
            </div>
  
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?momos" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
  
  
        <div className="container">
          {
            //ternary operator me(logic ye hai ki foodcat empty nahi hai to true bhejo empy hai to false bhejo)
            foodCategory !== "[]"
              ? foodCategory.map((data) => {
                return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                  foodItems !== "[]"
                    ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()) ))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                            {/* sara ka sra data foodItem me bheja or options alag se bheja  */}
                            <Card foodItems = {filterItems}
                              option={filterItems.options[0]}>
                            </Card>
                            {/* <Card foodName={filterItems.name}
                              img={filterItems.img}
                              option={filterItems.options[0]}>
                            </Card> */}
                          </div>
                        )
                      })
                    : <div>NO such Data Found</div>}
                </div>
                )
              })
              : ""
          }
        </div>
  
        <div> <Footer /></div>
      </div>
    );
}
