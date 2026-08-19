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
    const form = event.currentTarget
    const noteObj = {
      label: form.title.value,
      content: form.content.value,
      group: form.group.value || null,
      tags: form.tags.value.split(',').map(tag => tag.trim()).filter(Boolean),
      pinned: form.pinned.checked,
    }
    dispatch(createNote(noteObj))
      .unwrap()
      .then(() => {
        form.reset()
        navigate('/notes')
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
