import React,{useEffect ,useState} from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getData } from '../apis'
import Header from './Header/Header'
import List from './List/List'
import Map from './Map/Map'

export default function Home() {

    const [places , setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading , setIsLoading] = useState(false)


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) =>{
            setCoordinates({lat:latitude, lng:longitude})
        })
    },[])
    useEffect(()=> {
        if(bounds.sw && bounds.ne){
            setIsLoading(true)
            getData(bounds.sw,bounds.ne)
                .then((data) =>{
                    setPlaces(data.filter((place) => place.name && place.num_reviews >0 ))
                    setIsLoading(false)
                })
        }
    },[bounds])
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width:"100%"}}>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        places={places}
                        coordinates = {coordinates}
                        setChildClicked = {setChildClicked}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <List 
                        places={places}
                        childClicked= {childClicked}
                        isLoading= {isLoading}
                    />
                </Grid>
            </Grid>
        </>
    )
}
