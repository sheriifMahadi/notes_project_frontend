
import { Typography, TextField, Container,
  Button} from "@mui/material"

import useStyles from '../styles/styles'

const Forms = (props) => {
    const classes = useStyles()
    const defaultLabel= props.initialValues ? props.initialValues.label: ''
    const defaultContent = props.initialValues ? props.initialValues.content: ''
    
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