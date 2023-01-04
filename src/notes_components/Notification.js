import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';


const Notification = () => {

  const notification = useSelector(state => state.notification)
  return notification.message 
  ?(
    <div style={{margin: '20px', textAlign: 'center'}}>
      <Alert severity={notification.severity}>
        {notification.message}
      </Alert>
    </div>
  )
  :null
  
}

export default Notification