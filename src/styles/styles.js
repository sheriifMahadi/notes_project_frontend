import { makeStyles } from '@material-ui/styles'

const BACKGROUND_COLOR = '#f26257'
const TEXT_COLOR = 'white !important'

const useStyles = makeStyles((theme) => ({
    chosenColor: {
        backgroundColor: `${BACKGROUND_COLOR}!important`,
    }, 
    navbar: {
        textDecoration: 'none!important'
    },
    navbar2: {
         color: `${TEXT_COLOR}`
    }, 
    navbar3: {
         color: `${BACKGROUND_COLOR}!important`,
    }, 
    icons: {
        color: `${TEXT_COLOR}`,
        backgroundColor: 'white !important'
    },
    cardGrid: {
        padding: "50px 0",
    }, 
    card: {
        backgroundColor: `${BACKGROUND_COLOR}!important`,
        color: `${TEXT_COLOR}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardContent: {
        flexGrow: 1
    },
    cardActions: {
        justifyContent: 'flex-end'
    },
    footer: {
        backgroundColor: '#f5f3f2',
        padding: '30px 0',
        color: 'black', 
        // height: '20vh'
    },
    LoginIcon: {
        color: `${BACKGROUND_COLOR}!important`,
        fontSize: '50px!important'
   },
   loadingBtn: {
        color: `${BACKGROUND_COLOR}!important`,
        textAlign: 'center', 
        padding: '0', 
        margin: '60px 0 20px 0'
   },
   tableContainer: {
        padding: "50px 0",
        textDecoration: 'none !important',
        color: 'black!important',
   }

}))

export default useStyles