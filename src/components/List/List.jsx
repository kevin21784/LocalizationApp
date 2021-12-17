import React,{useState,useEffect, createRef} from 'react'
import { CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select } from '@material-ui/core'
import useStyles from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
const List = ({places,childClicked,isLoading}) => {
    const classes = useStyles()
    const [type, setType] = useState('restaurants')
    const [elRefs, setElrefs] = useState([])
    useEffect(()=> {
        const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef())

        setElrefs(refs)
    },[places])
    console.log({childClicked})
    return (
        <div className={classes.container}>
            <Typography variant='h6'>Restaurants Around You</Typography>
            {isLoading ? (
                <div className={classes.container}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
            <>
                <Grid container spacing={3} className={classes.list}>
                    {places?.map((place, index) => (
                        <Grid item key ={index} xs={12}>
                            <PlaceDetails 
                                place={place}
                                selected={Number(childClicked) === index}
                                refProp={elRefs[index]}
                            />
                        </Grid>
                    ))}
                </Grid>
            </>
            )}
        </div>
    )
}

export default List