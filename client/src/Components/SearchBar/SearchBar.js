import { Grid } from '@mui/material';
import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import "./../../App.css";
function SearchBar() {
   
  return (
    <div className='App'>
        <header className="App-header">
        <Grid container  
        justifyContent="center"
        alignItems="center" 
        >
          <Grid item md={8} lg={8} sm={12} xs={12} style={{marginTop:"40px",marginBottom:"20px"}} >
         <ReactSearchAutocomplete
            // items={items}

            placeholder='Search'
            // onSearch={handleOnSearch}
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