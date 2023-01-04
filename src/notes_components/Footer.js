import useStyle from '../styles/styles'
import { Typography, Grid } from '@mui/material'
import { Container, Box } from '@mui/system'
import Link from '@mui/material/Link'

const Footer = () => {
    const classes = useStyle()
    
    return <footer>
        <Box 
        sx={{marginTop:"calc(50% + 60px)"}}
        px={{xs: 3, sm: 10}} 
        py={{xs: 3, sm: 5}}
        bgcolor="black"
        color="white"
        >
           <Container maxWidth='lg'>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Help</Box>
                        <Box>
                            <Link href='' color='inherit'>
                                Contact
                            </Link>
                        </Box>
                        <Box>
                            <Link href='' color='inherit'>
                                Support
                            </Link>
                        </Box>
                        <Box>
                            <Link href='' color='inherit'>
                                Privacy
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Account</Box>
                        <Box>
                            <Link href='' color='inherit'>
                                Features
                            </Link>
                        </Box>
                        <Box>
                            <Link href='' color='inherit'>
                                Download
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Contact</Box>
                        <Box>
                            <Link href='https://www.twitter.com/TheOltaEgo' color='inherit'>
                                Twitter
                            </Link>
                        </Box>
                        <Box>
                            <Link href='https://github.com/sheriifMahadi' color='inherit'>
                                Github
                            </Link>
                        </Box>
                        <Box>
                            <Link href='https://www.linkedin.com/in/mahadi-sheriff' color='inherit'>
                                LinkedIn
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box 
                textAlign="center"
                pt={{xs: 5, sm: 5}}
                pb={{xs: 5, sm: 0}}>
                    Notes App &reg; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>
    </footer>


}

export default Footer