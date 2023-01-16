import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import DynamicCard from "../Card/DynamicCard";
import axios from "axios";
function History() {
  const [cardDetails, setCard] = useState([]);
  const [loading,setLoader]=useState(true)
  const [isData,setIsData]=useState(false)
  useEffect(()=>{
    const Token=localStorage.getItem('Token')
    if(Token){
        axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
        .then(result=>{
            console.log(result.data)
            const id=result.data
            axios.get(`http://localhost:5000/Content/history/getAll/${id}`)
            .then(result=>{
                console.log(result.data.result)
                setCard(result.data.result)
                setIsData(true)
            })
            .catch(err=>{
                console.log(err)
            })
            setLoader(false)
        })
        .catch(err=>{
            console.log(err);
        })
    }
  },[])
  return (
    <div className="min-h-screen">
        {loading?<>Loading</>:
        <>
        {isData?
      <Grid container spacing={2}>
        {cardDetails.map((card) => {
          return (
            <Grid item xs={12} md={4} lg={3} sm={6}>
              <DynamicCard cardDetail={card}/>
            </Grid>
          );
        })}
      </Grid>:<></>}</>}
    </div>
  );
}

export default History;
