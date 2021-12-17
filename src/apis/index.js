import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getData = async (sw,ne) => {
    try {
        const {data: {data} }= await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              // limit: '30',
            },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': '1c6b29a2b0msh042267be4f92d55p16023fjsn4905919b8b25'
          }
        });
        return data
    } catch (error) {
        console.log(error)
    }
}
