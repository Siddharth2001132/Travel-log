import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries } from "./API";
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 44.07622,
    longitude: -90.60283,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries(); //iife immediatelly invoke function expression
  }, []);

  const showMarkerPopup = ( event ) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude
    });
    }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/siddharth2001132/cke3weisk0gad19pbhnn8nmfu"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showMarkerPopup}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div
              onClick={() => setShowPopup({
                // ...showPopup,
                [entry._id]: true,
              })}
            >
              <svg className="marker yellow"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }} 
                version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 512 512" >
                <path d="M256,0C150.112,0,64,86.112,64,192c0,133.088,173.312,307.936,180.672,315.328
	C247.808,510.432,251.904,512,256,512c4.096,0,8.192-1.568,11.328-4.672C274.688,499.936,448,325.088,448,192
	C448,86.112,361.888,0,256,0z"/>
                <circle cx="256" cy="192" r="96"/>
              </svg>
            </div>
          </Marker>
          {
            showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                dynamicPosition={true}
                closeOnClick={false}
                onClose={() => setShowPopup({
                  [entry._id]: false,
                })}
                anchor="top"
              >
                <div className="popup">
                  <h4>{entry.title}</h4>
                  <p>{entry.comments}</p>
                  <small>
                    <strong>Visited date: </strong>
                    {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                  {entry.image && <img src={entry.image} alt={entry.title}/>}

                </div>
              </Popup>
            ) : null
          }
        </React.Fragment>
      ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <div>
                <svg className="marker red"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }} 
                  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 512 512" >
                  <path d="M256,0C150.112,0,64,86.112,64,192c0,133.088,173.312,307.936,180.672,315.328
    C247.808,510.432,251.904,512,256,512c4.096,0,8.192-1.568,11.328-4.672C274.688,499.936,448,325.088,448,192
    C448,86.112,361.888,0,256,0z"/>
                  <circle cx="256" cy="192" r="96"/>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              dynamicPosition={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <LogEntryForm onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }} location={addEntryLocation} />
              </div>
            </Popup>
          </>

        ) : null
      }
    </ReactMapGL>
  );
};

export default App;
