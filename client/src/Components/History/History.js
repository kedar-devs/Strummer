import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import DynamicCard from "../Card/DynamicCard";
import axios from "axios";
function History() {
  const [cardDetails, setCard] = useState();
  const [loading,setLoader]=useState(true)
  useEffect(()=>{
    const Token=localStorage.getItem('Token')
    if(Token){
        axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
        .then(result=>{
            console.log(result.data)
            const id=result.data
            axios.get(`http://localhost:5000/Content/history/getAll/${id}`)
            .then(result=>{
                console.log(result.data)
                setCard(result.data.result)
                
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
    <div>
        {loading?<>Loading</>:
      <Grid container spacing={2}>
        {cardDetails.map((ele) => {
          return (
            <Grid item xs={12} md={4} lg={3} sm={6}>
              <DynamicCard />
            </Grid>
          );
        })}
      </Grid>}
    </div>
  );
}

export default History;
