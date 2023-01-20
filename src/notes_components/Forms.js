
import { Typography, TextField, Container,
  Button} from "@mui/material"
import useStyles from '../styles/styles'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import { useSelector } from "react-redux"

export const GroupForm = (props) => {
  const classes = useStyles()

  return (
      <div>
            <Typography 
            variant="h4"
            color="textPrimary"
            gutterBottom
            align="left"
            style={{marginTop: "30px"}}
            >New Group
            </Typography>
            <form onSubmit={props.action}>
              <div style={{ marginBottom: '40px'}}>
                <TextField
                defaultValue=''
                required
                name="group"
                variant="standard"
                color="warning"
                placeholder="Group Name"
                margin="normal"
                maxRows={2}
                fullWidth
                />
        </div>
              <div>
              <Button variant="contained" 
              type="contained" 
              size="large"
              className={classes.chosenColor}
              >
                New Group
              </Button>
            </div>
            </form>
        </div>  
        )
}

const Forms = (props) => {
    const [group, setGroup] = useState('');

    const classes = useStyles()
    const defaultLabel= props.initialValues ? props.initialValues.label: ''
    const defaultContent = props.initialValues ? props.initialValues.content: ''
    
    const groups = useSelector(state => state.groups)
    
    const handleChange = (event) => {
      setGroup(event.target.value);
    };
  
    return (
        <div>
          <Container>
            <Typography 
            variant="h4"
            color="textPrimary"
            gutterBottom
            align="left"
            style={{marginTop: "30px"}}
            >{props.header}
            </Typography>
            <form onSubmit={props.action}>
              <div style={{ marginBottom: '40px'}}>
                <TextField
                defaultValue={defaultLabel}
                required
                name="title"
                variant="standard"
                color="warning"
                placeholder="Title"
                margin="normal"
                maxRows={3}
                fullWidth
                />
              </div>
              <div>
                <TextField
                defaultValue={defaultContent}
                required 
                name="content"
                variant="standard"
                color="warning"
                placeholder="Content"
                multiline
                rows={4}
                margin="normal"   
                fullWidth         
                />
              </div>
              <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="g">Group</InputLabel>
                <Select
                  name="group"
                  labelId="group"
                  id="group"
                  value={group}
                  onChange={handleChange}
                  label="Group"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {groups.map(group => 
                    <MenuItem key={group.id} value={group.groupName}>
                      {group.groupName}
                      </MenuItem>
                  )}
                </Select>
            </FormControl>
              </div>
              <div>
              <Button variant="contained" 
              type="contained" 
              size="large"
              className={classes.chosenColor}
              >
                {props.buttonLabel}
              </Button>
            </div>
            </form>
          </Container>

        </div>
    )
}



export default Forms