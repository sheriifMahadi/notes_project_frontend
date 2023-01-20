import { useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import useStyles from "../styles/styles"
import {
  Container, Table, TableBody, TableCell, 
  TableContainer, TableRow,Paper, Typography} from '@mui/material'
import { Link } from "react-router-dom"


const GroupTemplate = (props) => {
    const classes = useStyles()
    const groups = useSelector(state => state.groups)
 
    return (
      <Container className={classes.tableContainer}>
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {props.iter.map(iterable => (
              <TableRow key={iterable.id}>
                <TableCell>
                  <Link 
                    className={`${classes.navbar} ${classes.navbar3}`} 
                    to={`${props.to}/${iterable.id}`}
                    >
                    {iterable.groupName || iterable.label}
                  </Link>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>

    )
    
}

export default GroupTemplate