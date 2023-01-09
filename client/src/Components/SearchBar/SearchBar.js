import { Grid } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import "./../../App.css";
function SearchBar() {
  let item=''
   const handleOnSearch=(item)=>{
    console.log(item)
    axios.get(`http://localhost:5000/Content/search/${item}`)
    .then(result=>{
      console.log(result.data)
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
          </Grid>
          </Grid>
    </header>
    </div>
  )
}

export default SearchBar