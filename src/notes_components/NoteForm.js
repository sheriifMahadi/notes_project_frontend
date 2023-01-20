import  { createNote } from "../reducers/notesReducer"
import { useDispatch } from "react-redux"
import useStyles from '../styles/styles'
import { useNavigate,} from 'react-router-dom'
import Forms from '../notes_components/Forms'
import { logout } from '../reducers/accountReducer';


const NoteForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const addNote = async (event) => {
    event.preventDefault()
    const noteObj = {
      label: event.target.title.value,
      content: event.target.content.value,
      groupname: event.target.group.value,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    }
    event.target.title.value = ''
    event.target.content.value = ''
    dispatch(createNote(noteObj))
      .unwrap()
      .then(data => {
        event.target.title.value = ''
        event.target.content.value = ''
        navigate("/");
      })
      .catch(e => {
          if (e.message === 'Request failed with status code 401'){
            dispatch(logout())
          } 
      });
    
  }
    return (
      <>
        <Forms 
        header={'New Note'}
        action={addNote}
        buttonLabel={'Add note'}/>
      </>
    
    )
}

export default NoteForm