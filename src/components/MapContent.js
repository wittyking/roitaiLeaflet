import React,{ useState, useRef} from "react"; //rafce
import { MapContainer, 
  Marker, 
  Tooltip, 
  TileLayer, 
  useMap, 
  LayersControl, 
  LayerGroup } from 'react-leaflet'
import L from 'leaflet'

import BaseMap from "./layer/BaseMap";
import CSVFileLocal from "./layer/CSVFileLocal";

import 'leaflet-rotatedmarker'
import iconAir from 'leaflet/dist/images/air3.png'

import Routeaircraft from "./layer/Routeaircraft";
import Province from "./layer/Province";

import Firmnasa from "./layer/Firmnasa";
import iconFirm from 'leaflet/dist/images/fire.gif'
import FormData from "./layer/FormData";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import AircraftCSV from "./layer/AircraftCSV";

import './map.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import LeafletDrawControl from "./widgets/LeafletDrawControl";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 20.5]
});
L.Marker.prototype.options.icon = DefaultIcon;

let airMarker = L.icon({
  iconUrl: iconAir,
  iconSize: [20,20],
  iconAnchor: [10,10]
})

let firmMarker = L.icon({
  iconUrl: iconFirm,
  iconSize: [20,20],
  iconAnchor: [10,10]
})

const handleDrawCreated = (geojson)=>{
  console.log(geojson)
}

const MapContent = () => {

  const mapRef = useRef()
  const [aircraft, setAircraft] = useState(null)
  const [ firm, setFirm ] = useState(null)
  const [data, setData]= useState({
    title: '',
    latitude:'',
    longitude: '',
    icon: '',
    size: ''
  })

  function fitTo(objects) {
    const bounds = objects.reduce(
        function(acc, cur) {
            return acc.extend([cur.latitude, cur.longitude]);
        },
        L.latLngBounds()
    );
    // console.log('bounds ',bounds)
    mapRef.current.fitBounds(bounds);
  }

  const onChangeData = (e)=> {
    // console.log(e.target.name, e.target.value)
    setData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit= (e)=>{
    e.preventDefault()
    console.log(data)
  }

  const handleDrawCreated = (geojson) => {
    console.log(geojson)
  }
  // console.log('data',data)
  return (
    <div>
      {/* HTML */}
      <Firmnasa setFirm={setFirm}/>
      <AircraftCSV setAircraft={setAircraft} fitTo={fitTo}/>

      <div className="row">
        <div className="col-10">

        <MapContainer 
        ref={mapRef}
        style={{width: '100%', height: '100vh'}}
        center={[13, 100]} 
        zoom={6} 
        scrollWheelZoom={true}
        >
          <LayersControl postion='topright'>
          {/* EP2 */}
          <BaseMap/>

          <LayersControl.Overlay name="Airport" >
            <LayerGroup>
              {/* EP3 */}
              <CSVFileLocal/>            
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Aircraft" >
            <LayerGroup>
              {/* EP5 */}
              {aircraft && aircraft.map((item,index) =>
                <Marker 
                icon={airMarker}
                rotationAngle={item.bearing}
                key={index}
                position={[item.latitude, item.longitude]}>
                  <Tooltip>
                    angle:{item.angle}
                  </Tooltip>
                </Marker>
              )}            
              <Routeaircraft aircraft={aircraft}/>            
            </LayerGroup>

          </LayersControl.Overlay>

          <LayersControl.Overlay name="Province" >
            <LayerGroup>
              
              <Province />            
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="แผนที่ความร้อน" >
            <LayerGroup>
              {/* EP13 */}
              {firm && firm.map((item,index) =>
                <Marker 
                icon={firmMarker}          
                key={index}
                position={[item.latitude, item.longitude]}>
                  <Tooltip>
                    {Object.keys(item).map(key=>
                      <div key={key}>
                        <b>{key}</b> : {item[key]}
                      </div>
                    )}
                  </Tooltip>
                </Marker>
              )}                      
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Map Click" checked>
            <LayerGroup>
              
              <FormData 
              DefaultIcon={DefaultIcon}
              setData={setData}
              data={data}
              />                     
            </LayerGroup>
          </LayersControl.Overlay>
          </LayersControl>

          <LeafletDrawControl
           onDrawCreated={handleDrawCreated} 
           />
        </MapContainer>
        </div>
        <div className="col-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                onChange={onChangeData}
                className="form-control"
                name="title"
                type="text" />
              <label>latitude</label>
            </div>
            <div className="form-group">
              <input
                value={data.latitude}
                className="form-control"
                name="latitude"
                type="text" />
            </div>
            <div className="form-group">
              <label>longitude</label>
              <input
                value={data.longitude}
                className="form-control"
                name="longitude"
                type="text" />
            </div>
            <div className="form-group">
              <label>icon</label>
              <input
                className="form-control"
                onChange={onChangeData}
                name="icon"
                type="text" />
            </div>
            <div className="form-group">
              <label>size</label>
              <input
                onChange={onChangeData}
                className="form-control"
                name="size"
                type="range" />
            </div>
            <hr/>
            <div className="form-group">
              <button className="btn btn-primary" 
              type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>      
    </div>
  );
};

export default MapContent;
