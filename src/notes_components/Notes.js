import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ArchiveOutlined, DeleteForeverOutlined, DeleteOutlineOutlined, InfoOutlined,
  PushPinOutlined, RestoreFromTrashOutlined, UnarchiveOutlined
} from '@mui/icons-material'
import {
  Box, Card, CardActions, CardContent, Chip, CircularProgress, Container,
  FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField,
  Tooltip, Typography
} from '@mui/material'
import useStyles from '../styles/styles'
import {
  archiveNote, deleteNote, retrieveNotes, setFilters, togglePin, trashNote
} from '../reducers/notesReducer'

const Note = ({ view = 'active' }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, status, filters } = useSelector(state => state.notes)
  const groups = useSelector(state => state.groups)
  const activeFilters = { ...filters, status: view }

  useEffect(() => {
    const timer = setTimeout(() => dispatch(retrieveNotes(activeFilters)), 250)
    return () => clearTimeout(timer)
  }, [dispatch, filters.q, filters.sort, filters.tag, view])

  const updateFilter = values => dispatch(setFilters(values))
  const ellipsis = (text, length) => text.length > length ? `${text.slice(0, length)}...` : text
  const confirmPermanentDelete = id => {
    if (window.confirm('Permanently delete this note? This cannot be undone.')) dispatch(deleteNote(id))
  }

  return (
    <div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
        <TextField fullWidth variant="standard" label="Search title, content or tags" value={filters.q}
          onChange={event => updateFilter({ q: event.target.value })} />
        <FormControl variant="standard" sx={{ minWidth: 130 }}>
          <InputLabel>Sort</InputLabel>
          <Select value={filters.sort} onChange={event => updateFilter({ sort: event.target.value })}>
            <MenuItem value="modified">Last updated</MenuItem>
            <MenuItem value="created">Newest</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>
        <TextField variant="standard" label="Tag" value={filters.tag}
          onChange={event => updateFilter({ tag: event.target.value.toLowerCase() })} />
      </Stack>

      {status === 'loading' && <Box sx={{ textAlign: 'center', mt: 8 }}><CircularProgress color="warning" /></Box>}
      {status === 'succeeded' && items.length === 0 && (
        <Typography align="center" color="text.secondary" sx={{ mt: 8 }}>
          {view === 'active' ? 'No notes found. Create one or adjust your filters.' : `Your ${view} is empty.`}
        </Typography>
      )}

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {items.map(note => (
            <Grid item key={note.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActions className={classes.cardActions}>
                  {view === 'active' && <Tooltip title={note.pinned ? 'Unpin' : 'Pin'}>
                    <IconButton aria-label={note.pinned ? 'unpin note' : 'pin note'} onClick={() => dispatch(togglePin({ id: note.id, pinned: !note.pinned }))}>
                      <PushPinOutlined color={note.pinned ? 'warning' : 'inherit'} />
                    </IconButton>
                  </Tooltip>}
                  <Tooltip title="Details"><IconButton aria-label="view note" onClick={() => navigate(`/${note.id}`)}><InfoOutlined /></IconButton></Tooltip>
                </CardActions>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" gutterBottom>{ellipsis(note.label, 40)}</Typography>
                  <Typography>{ellipsis(note.content, 80)}</Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 2, flexWrap: 'wrap', gap: 0.5 }}>
                    {(note.tags || []).map(tag => <Chip key={tag} label={tag} size="small" />)}
                  </Stack>
                  {note.group && <Typography variant="caption">{groups.find(group => group.id === note.group)?.groupName || ''}</Typography>}
                </CardContent>
                <CardActions>
                  {view === 'active' && <Tooltip title="Archive"><IconButton aria-label="archive note" onClick={() => dispatch(archiveNote({ id: note.id }))}><ArchiveOutlined /></IconButton></Tooltip>}
                  {view === 'archived' && <Tooltip title="Unarchive"><IconButton aria-label="unarchive note" onClick={() => dispatch(archiveNote({ id: note.id, archived: false }))}><UnarchiveOutlined /></IconButton></Tooltip>}
                  {view !== 'trash' && <Tooltip title="Move to trash"><IconButton aria-label="move note to trash" onClick={() => dispatch(trashNote({ id: note.id }))}><DeleteOutlineOutlined /></IconButton></Tooltip>}
                  {view === 'trash' && <>
                    <Tooltip title="Restore"><IconButton aria-label="restore note" onClick={() => dispatch(trashNote({ id: note.id, deleted: false }))}><RestoreFromTrashOutlined /></IconButton></Tooltip>
                    <Tooltip title="Delete forever"><IconButton aria-label="delete note forever" onClick={() => confirmPermanentDelete(note.id)}><DeleteForeverOutlined /></IconButton></Tooltip>
                  </>}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default Note
