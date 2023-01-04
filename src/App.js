import './App.css'
import { useEffect, useState } from 'react'
import Note from './notes_components/Notes';
import NoteForm from './notes_components/NoteForm';
import { useDispatch } from 'react-redux';
import { retrieveNotes } from './reducers/notesReducer';
import { 
  Routes, Route, useMatch} from "react-router-dom"
import { CssBaseline, Container  } from '@mui/material';
import ResponsiveAppBar from './notes_components/Nav';
import Footer from './notes_components/Footer';
import Login from './notes_components/Login'
import { useLocation } from 'react-router-dom';
import SignUp from './notes_components/SignUp'
import Notification from './notes_components/Notification'
import ProtectedRoute from './notes_components/Protected'
import SingleNote from './notes_components/SingleView'
import { logout } from './reducers/accountReducer';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveNotes())
    .unwrap()
    .then(data => {
    })
    .catch(e => {
      if (e.message === 'Request failed with status code 401'){
        dispatch(logout())
      } 
    });
  }, [dispatch]) 

  const match = useMatch('/:id')
  let note = match ? match.params.id : null

  const { pathname } = useLocation();
  const paths = ['/login', '/sign-up']
  const paths2 = ['/notes', '/Notes', '/new', '/New', '/', `/${note}`]
  return (
     <>
       <CssBaseline />
       { paths.includes(pathname) || !paths2.includes(pathname)
       ? null
       : <ResponsiveAppBar/>}
        <Container maxWidth="sm">

        <Notification/>

        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Note/>
            </ProtectedRoute>
          }/>
          <Route path="Notes" element={
             <ProtectedRoute>
              <Note/>
            </ProtectedRoute>
          }/>
            <Route path="/:id" element={
              <ProtectedRoute>
                <SingleNote id={note}/>
              </ProtectedRoute>
          }/>
          <Route path="New" element={
              <ProtectedRoute>
                <NoteForm/>
              </ProtectedRoute>
          }/>
             <Route path="Groups" element={
              <ProtectedRoute>
                <NoteForm/>
              </ProtectedRoute>
          }/>
          <Route path="Login" element={
              <Login/>
          }/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/*" element={<p>There's nothing here: 404!</p>} />
        </Routes>      
        </Container>
        <Footer/>

      </>
  );
}

export default App;
