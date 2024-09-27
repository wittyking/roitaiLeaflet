import React from 'react'
import { Marker, useMapEvent } from 'react-leaflet'
import * as L from 'leaflet'

const FormData = ({data, setData, DefaultIcon}) => {
  // let halfSize = Math.floor(data.size/2)
  let clickMarker = data.icon ? L.icon({
    iconUrl: data.icon,
    iconSize: [data.size,data.size],
    iconAnchor: [data.size/2,data.size/2]
    // iconAnchor: [halfSize,halfSize]
  }) : DefaultIcon

  const map = useMapEvent({    
    dblclick(e){
      // console.log(e.latlng)
      map.flyTo(e.latlng)//,10)

      setData((prevState)=>({
        ...prevState,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      }))
    }
  })
  
  // console.log('data from component',data)
  // console.log('clickMarker',clickMarker)
  return data.latitude && data.longitude && 
  <Marker 
  icon={clickMarker}
  position={[data.latitude, data.longitude]}></Marker>
}

export default FormData
