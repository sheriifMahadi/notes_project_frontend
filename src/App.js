import './App.css'
import { useEffect, useState } from 'react'
import Note from './notes_components/Notes';
import NoteForm from './notes_components/NoteForm';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveGroups } from './reducers/groupsReducer';

import { 
  Routes, Route, useMatch} from "react-router-dom"
import { CssBaseline, Container, ThemeProvider, createTheme } from '@mui/material';
import ResponsiveAppBar from './notes_components/Nav';
import Footer from './notes_components/Footer';
import Login from './notes_components/Login'
import { useLocation } from 'react-router-dom';
import SignUp from './notes_components/SignUp'
import Notification from './notes_components/Notification'
import ProtectedRoute from './notes_components/Protected'
import SingleNote from './notes_components/SingleView'
import { logout } from './reducers/accountReducer';
import Group from './notes_components/Groups';
import GroupDetails from './notes_components/GroupsDetails';

const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.account.isLoggedIn)
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light')
  const theme = createTheme({
    palette: { mode, primary: { main: '#f26257' }, warning: { main: '#f26257' } }
  })
  const toggleTheme = () => setMode(current => {
    const next = current === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', next)
    return next
  })

  useEffect(() => {
    if (!isLoggedIn) return undefined
    dispatch(retrieveGroups())
    .unwrap()
    .then(data => {
    })
    .catch(e => {
      if (e.message === 'Request failed with status code 401'){
        dispatch(logout())
      } 
    });
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    const handleExpired = () => dispatch(logout())
    window.addEventListener('auth-expired', handleExpired)
    return () => window.removeEventListener('auth-expired', handleExpired)
  }, [dispatch])

  const match = useMatch('/:id')
  const matchgroup = useMatch('/groups/:id')

  let note = match ? match.params.id : null
  let group = matchgroup ? matchgroup.params.id : null

  
  const { pathname } = useLocation();
  const paths = ['/login', '/sign-up']
  return (
     <ThemeProvider theme={theme}>
       <CssBaseline />
       { paths.includes(pathname.toLowerCase())
       ? null
       : <ResponsiveAppBar mode={mode} toggleTheme={toggleTheme}/>}
        <Container maxWidth="sm">

        <Notification/>

        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Note/>
            </ProtectedRoute>
          }/>
          <Route path="notes" element={
             <ProtectedRoute>
              <Note/>
            </ProtectedRoute>
          }/>
          <Route path="archive" element={<ProtectedRoute><Note view="archived"/></ProtectedRoute>}/>
          <Route path="trash" element={<ProtectedRoute><Note view="trash"/></ProtectedRoute>}/>
            <Route path="/:id" element={
              <ProtectedRoute>
                <SingleNote id={note}/>
              </ProtectedRoute>
          }/>
          <Route path="new" element={
              <ProtectedRoute>
                <NoteForm/>
              </ProtectedRoute>
          }/>
             <Route path="groups" element={
              <ProtectedRoute>
                <Group/>
              </ProtectedRoute>
          }/>
           <Route path="groups/:id" element={
              <ProtectedRoute>
                <GroupDetails id={group}/>
              </ProtectedRoute>
          }/>
          <Route path="login" element={
              <Login/>
          }/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/*" element={<p>There's nothing here: 404!</p>} />
        </Routes>      
        </Container>
        <Footer/>

      </ThemeProvider>
  );
}

export default App;
