import GroupTemplate from "./GroupsTemplate"
import SearchField from "./Search";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Button } from "@mui/material"
import useStyles from "../styles/styles"
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react'
import { TextField, Typography } from "@mui/material"
import { createGroup } from "../reducers/groupsReducer";
import { logout } from '../reducers/accountReducer';
import { useNavigate,} from 'react-router-dom'
import { updateNotification } from "../reducers/notificationReducers";
import { GroupForm } from '../notes_components/Forms'

const Group = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const groups = useSelector(state => state.groups)
  const [display, setDisplay] = useState(false)
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const handleSearchInput = (event) => {
    setSearch(event.target.value)
  }
  const itemsToShow = showAll 
    ? groups
    : groups.filter(group =>
        group.groupName.toLowerCase().includes(search.toLowerCase()))
  
  const addGroup = async (event) => {
    event.preventDefault()
    const groupObj = {
      groupName: event.target.group.value,
    }
    dispatch(createGroup(groupObj))
      .unwrap()
      .then(data => {
        event.target.group.value = ''
        setDisplay(false)
      })
      .catch(e => {
          groups.map((group) => {
            if (groupObj.groupName === group.groupName) {
              dispatch(updateNotification({msg: 'Group name already taken',  severity: 'error'}));

            }
            
          })        
          if (e.message === 'Request failed with status code 401'){
            dispatch(logout())
          } 
      });
    
  }
    
  const displayForm = (event) => {
    setDisplay(true)
  }
 
  if (display === true){
    return (
    <div >
      <GroupForm
      action={addGroup}
      />
    </div>)
  }
   return (
     <>
      <SearchField searchInput={handleSearchInput} val={search}/>

      <div style={{textAlign: 'center', paddingTop: '50px'}}>
      <Button variant="contained" 
              type="contained" 
              size="small"
              className={classes.chosenColor}
              onClick={() => displayForm()}
              >
        <AddCircleRoundedIcon/>
        New group
      </Button>
      </div>
      <GroupTemplate 
        iter={itemsToShow}
        to={'/groups'}
      />
     </>
   )
}

export default Group