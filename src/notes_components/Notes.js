import { useSelector, useDispatch} from "react-redux"
import { Typography, Grid, Container, Card, CardActions, CardContent } from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import useStyles from "../styles/styles"
import Tooltip from '@mui/material/Tooltip';
import  { deleteNote } from "../reducers/notesReducer"
import { useState } from "react";
import {
    useNavigate,
  } from 'react-router-dom'
import { logout } from '../reducers/accountReducer';
import SearchField from "./Search";

const Note = () => {
    const [search, setSearch] = useState('')
    const [showAll, setShowAll] = useState(false)
    
    const classes = useStyles()
    const notes = useSelector(state => state.notes)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const elipses = (text, len, slice) => {
        if (text.length > len) {
            return `${text.slice(0, slice)}...`
        }
        else {
            return text
        }
    }
    const handleDetails = async(id) => {
        navigate(`/${id}`);
    }

    const handleDelete = (id) => {
        dispatch(deleteNote(id))
        .unwrap()
        .then(data => {
        })
        .catch(e => {
            if (e.message === 'Request failed with status code 401'){
                dispatch(logout())
              } 
        });
    }

    const handleSearchInput = (event) => {
        setSearch(event.target.value)
      }

    const itemsToShow = showAll 
    ? notes
    : notes.filter(note =>
        note.label.toLowerCase().includes(search.toLowerCase()))
    return (
        <div>
            <SearchField searchInput={handleSearchInput} val={search}/>

            <Container className={classes.cardGrid} maxWidth="md">
            {/* <SearchField/> */}
                <Grid container spacing={4}>
                {itemsToShow.map(note => 
                    <Grid item key={note.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                       <CardContent className={classes.cardContent}>
                       <CardActions className={classes.cardActions}>
                            <Tooltip title='details' sx={{color: 'white', opacity: '0.6'}}>
                                <IconButton onClick={() => handleDetails (note.id)} >
                                <InfoOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                           <Typography variant='h5' gutterBottom>
                           {elipses(note.label, 50, 40)}
                           </Typography>
                           <Typography>
                                {elipses(note.content, 50, 80)}
                           </Typography>
                        </CardContent> 
                        <CardActions>
                            <Tooltip title="delete" sx={{color: 'white', opacity: '0.6'}}>
                            <IconButton edge="start" onClick={() => handleDelete(note.id)}>
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                            </Tooltip>                        
                        </CardActions>
                    </Card>
                </Grid>
                )}                  
                </Grid>
            </Container>
        </div>

    )
   
}

export default Note

