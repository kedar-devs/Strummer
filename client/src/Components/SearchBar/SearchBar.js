import { Grid } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom';
import "./../../App.css";
function SearchBar() {
  const [key,setKey]=useState('')
  const navigate=useNavigate()
  useEffect(()=>{
    const search=document.getElementById('search').addEventListener("keypress",(e)=>{
      if(e.key==='Enter'){
        navigate(`/searchPage/${key}`)
      }
    })
    console.log(search)
  },[navigate,key])
  let item=''
  
   const handleOnSearch=(item)=>{
    console.log(item)
    setKey(item)
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