import GroupTemplate from "./GroupsTemplate"
import useStyles from "../styles/styles"
import { useSelector, useDispatch} from "react-redux"
import { useState, useEffect } from 'react'
import { retrieveSingleGroup, retrieveGroupNotes, deleteGroup} from '../reducers/groupsReducer'
import { logout } from '../reducers/accountReducer';
import { updateNotification } from "../reducers/notificationReducers";
import { Typography } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useNavigate,Navigate } from 'react-router-dom'

const GroupDetails = ({id}) => {
	const initialState = [
	  ]
	const [single, setSingle] = useState(initialState)
	const [singleGroup, setSingleGroup] = useState(initialState)

	const classes = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const groups = useSelector(state => state.groups)

	const fetchGroup = async () => {
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

	  const fetchNotes = async (id) => {
        try{
          const res = await dispatch(retrieveGroupNotes(id)).unwrap()
		  return res
    
        }catch(err) {
          if (err.message === 'Request failed with status code 401'){
			dispatch(logout())
          }
          dispatch(updateNotification({msg: 'Page not found',  severity: 'error'}))
        }
      }

	useEffect(() => {
		fetchGroup().then(resolved => {
		if (resolved) {
			setSingleGroup(resolved)
			fetchNotes(resolved.notes).then(data => {
				data ? setSingle(data) : setSingle([]) 
				
			})
		}
		})
	}, [])

    const handleDelete = async (id) => {
		try{
			const res = await dispatch(deleteGroup(id)).unwrap()
			navigate(`/Groups`);
			window.location.reload();
			return res
	  
		  }catch(err) {
			  console.log(err)
			if (err.message === 'Request failed with status code 401'){
			  dispatch(logout())
			}
			dispatch(updateNotification({msg: 'Error performing action',  severity: 'error'}))
		  }	
	}

	return (
	 <>
	  	<Typography 
            variant="h4"
            color="textPrimary"
            gutterBottom
            align="left"
            style={{marginTop: "30px", marginLeft: '30px'}}>
			{singleGroup.groupName}
				
			<Tooltip title="delete" sx={{opacity: '0.6', paddingLeft: '30px'}}>
                <IconButton edge="start" onClick={() => handleDelete(singleGroup.id)}>
                    <DeleteOutlineOutlinedIcon/>
                </IconButton>
            </Tooltip> 

        </Typography>
	  <GroupTemplate 
		iter={single}
		to={''}
	  />
	 </>
   )
}

export default GroupDetails