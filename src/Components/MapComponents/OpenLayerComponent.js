import React, { useEffect, useState, useRef } from "react";
import "ol/ol.css";
import "ol-popup/src/ol-popup";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
// import {toStringHDMS} from 'ol/coordinate';

// Import styling
import "../../App.css";

const OpenLayerComponent = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  const [lng] = useState(-97.7431);
  const [lat] = useState(30.2672);
  const [zoom] = useState(2);

  useEffect(() => {
    
    map.current = new Map({
        target: mapContainerRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [lng, lat],
          zoom: zoom,
        }),
      });
  
      return () => {
        map.current.setTarget(null);
      };
  }, [lat, lng, zoom]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default OpenLayerComponent;
