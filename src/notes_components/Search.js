import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Container } from "@mui/material"

const SearchField = ({searchInput, val}) => {
  return (
    <Container>
        <div style={{textAlign: 'center', marginBottom: '', marginTop: '20px'}}>
        <form onChange={searchInput}>
            <TextField id="standard-basic" 
            label="Search" 
            variant="standard" 
            />
        </form>
        </div>
    </Container>
  );
}


export default SearchField