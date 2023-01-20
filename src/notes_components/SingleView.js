import { useDispatch } from 'react-redux'
import  { retrieveSingleNotes } from "../reducers/notesReducer"
import { useState, useEffect } from 'react'
import { updateNotification } from "../reducers/notificationReducers";
import {
  useNavigate} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Typography,  Container} from "@mui/material"
import Forms from '../notes_components/Forms'
import  { updateNote, deleteNote } from "../reducers/notesReducer"
import { logout } from '../reducers/accountReducer';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { retrieveSingleGroup, retrieveGroupNotes, deleteGroup} from '../reducers/groupsReducer'

 
const SingleNote = ({id}) => {
    const initialState = {
        id: null,
        label: "",
        content: "",
        created: "",
        modified: "",
        user: ""
      };
  
    const [single, setSingle] = useState(initialState)
    const [display, setDisplay] = useState(false)
    const [singleGroup, setSingleGroup] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const fetch = async () => {
        try{
          const res = await dispatch(retrieveSingleNotes(id)).unwrap()
          return res
    
        }catch(err) {
          if (err.message === 'Request failed with status code 401'){
            dispatch(logout())
          }
          dispatch(updateNotification({msg: 'Page not found',  severity: 'error'}))
        }
      }
      const fetchGroup = async (id) => {
        try{
          const res = await dispatch(retrieveSingleGroup(id)).unwrap()
		      return res
    
        }catch(err) {
          if (err.message === 'Request failed with status code 401'){
			    dispatch(logout())
          }
          dispatch(updateNotification({msg: 'Page not found',  severity: 'error'}))
        }
      }
    useEffect(() => {
      fetch().then(resolved => {
        if (resolved) {
            setSingle(resolved)
            if (resolved.group){
              fetchGroup(resolved.group).then(resolved => {
                if (resolved) {
                    setSingleGroup(resolved)
                }
              })
            }
          
        }
      })
    }, [])
      const convertDate = (d) => {    
        if (d) {
          let fullDate = new Date(d)
          const date = fullDate.toDateString()
          const time = fullDate.toLocaleTimeString().slice(0, 5)
          const dateTime = `${date}, ${time}`
          return dateTime
        }        
      }
      const handleUpdate = async (event) => {
        event.preventDefault()
        const noteObj = {
              label: event.target.title.value,
              content: event.target.content.value,
              groupname: event.target.group.value,
              modified: new Date().toISOString(),
            }
          
        dispatch(updateNote({id: single.id, noteobj: noteObj}))
          .unwrap()
          .then(data => {
            console.log(data)
            event.target.title.value = ''
            event.target.content.value = ''
            setDisplay(false)
            setSingle(data)
          })
          .catch(e => {
          });
    }
    const handleDelete = async (id) => {
      try{
        const res = await dispatch(deleteNote(id)).unwrap()
        navigate(`/Groups`);
        window.location.reload();
        return res
      
        }catch(err) {
        if (err.message === 'Request failed with status code 401'){
          dispatch(logout())
        }
        dispatch(updateNotification({msg: 'Error performing action',  severity: 'error'}))
        }	
    }
    const displayForm = (event) => {
      setDisplay(true)
    }
    if (display === true){
      return (<div>
        <Forms 
          header={'Update Note'}
          action={handleUpdate}
          buttonLabel={'update note'}
          initialValues={single}/>
      </div>)
    }
    return (
        <div style={{paddingTop: '30px'}}>
          <Container maxWidth="sm">
             <Tooltip title="update">
                <IconButton edge="end" onClick={() => displayForm()}>
                    <CreateOutlinedIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title="delete" sx={{marginLeft: '20px'}}>
                  <IconButton edge="start" onClick={() => handleDelete(single.id)}>
                      <DeleteOutlineOutlinedIcon/>
                  </IconButton>
                </Tooltip> 
            <Typography variant="h5" align="center">
              Title: {single.label}
            </Typography>
            <Typography variant="h6" align="center">
              Content: {single.content}
            </Typography>
            <Typography variant="h6" align="center">
              Created: {convertDate(single.created)}
            </Typography>
            <Typography variant="h6" align="center">
              Last modified: {convertDate(single.modified)}
            </Typography>
            <Typography variant="h6" align="center">
              Group: {singleGroup.groupName}
            </Typography>
          </Container>
        </div>
    )
   
}


export default SingleNote