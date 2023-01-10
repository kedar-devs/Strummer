import { Grid } from '@mui/material';
import axios from 'axios';
import React,{useEffect} from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom';
import "./../../App.css";
function SearchBar() {
  const navigate=useNavigate()
  useEffect(()=>{
    const search=document.getElementById('search').addEventListener("keypress",(e)=>{
      if(e.key==='Enter'){
        navigate(`/searchPage/${e.target.value}`)
      }
    })
    console.log(search)
  },[])
  let item=''
  
   const handleOnSearch=(item)=>{
    console.log(item)
    axios.get(`http://localhost:5000/Content/search/${item}`)
    .then(result=>{
      console.log(result.data)
      const event=document.getElementById('search')
      console.log(event)
    })
    .catch(err=>{
      console.log(err)
    })
   }
  return (
    <div className='App'>
        <header className="App-header">
        <Grid container  
        justifyContent="center"
        alignItems="center" 
        >
          <Grid item md={8} lg={8} sm={12} xs={12} style={{marginTop:"40px",marginBottom:"20px"}} >
            <div id='search'>
         <ReactSearchAutocomplete
            items={item}
            placeholder='Search'
            onSearch={handleOnSearch}
            // onHover={handleOnHover}
            // onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            autoFocus
            // styling={{
            //   margin:"40px"
            // }
            // }
            // formatResult={formatResult}
          />
          </div>
          </Grid>
          </Grid>
    </header>
    </div>
  )
}

export default SearchBar