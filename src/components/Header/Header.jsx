import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React,{useState} from 'react'
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext.js';
import {useHistory} from 'react-router-dom'
import useStyles from './styles.js';

const Header = ({ setCoordinates}) => {
    const classes = useStyles();
    const [error,setError] = useState('')
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoc) => setAutocomplete(autoc)

    const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      setCoordinates({lat , lng})
    }

    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.push("/signin")
        }catch{
            setError('Failed to log out')
        }
    }  
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Localization
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            {error && <Alert variant='danger'>{error}</Alert>}
          </Typography>
          
          <Typography variant="h6" className={classes.title}>
            Search
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
          <Typography variant="h6" className="">
            {currentUser.email}
          </Typography>
          <Button onClick={handleLogout}>Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

