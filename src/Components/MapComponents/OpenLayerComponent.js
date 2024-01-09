import React, { useEffect, useState, useRef } from "react";
import "ol/ol.css";
import "ol-popup/src/ol-popup.css";
import Map from "ol/Map";
import View from "ol/View";
import { transform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
import LayerImage from "ol/layer/Image";
import SourceImageArcGISRest from "ol/source/ImageArcGISRest";
import TileWMS from 'ol/source/TileWMS';
import SourceStamen from "ol/source/Stamen";
import SourceXYZ from "ol/source/XYZ";
import LayerSwitcher from "ol-layerswitcher";

// Import styling
import "../../App.css";
// import { layerGroup } from "leaflet";

const OpenLayerComponent = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  const [lng] = useState(100.6211);
  const [lat] = useState(15.1346);
  const [zoom] = useState(5.5284);

  useEffect(() => {
    map.current = new Map({
      target: mapContainerRef.current,
      layers: [
        new LayerGroup({
          title: "Base maps",
          layers: [
            new LayerGroup({
              title: "Water color with labels",
              type: "base",
              combine: true,
              visible: false,
              layers: [
                new TileLayer({
                  source: new SourceStamen({
                    layer: "watercolor",
                  }),
                }),
                new TileLayer({
                  source: new SourceStamen({
                    layer: "terrain-labels",
                  }),
                }),
              ],
            }),
            new TileLayer({
              title: "water color",
              type: "base",
              visible: false,
              source: new SourceStamen({
                layer: "watercolor",
              }),
            }),
            new TileLayer({
              title: "OSM",
              type: "base",
              visible: true,
              source: new OSM({}),
            }),
          ],
        }),
        new LayerGroup({
            title: 'Overlays',
            layers:[
              new TileLayer({
                title: 'Countries',
                source: new SourceXYZ({
                  ratio: 1,
                  params: {'LAYERS': 'show:0'},
                  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                }),
              }),
            ],
        }),
      ],
      view: new View({
        center: transform([lng, lat], "EPSG:4326", "EPSG:3857"),
        zoom: zoom,
      }),
    });

    const layerSwitcher = new LayerSwitcher();
    map.current.addControl(layerSwitcher);

    return () => {
      map.current.setTarget(null);
    };
  }, [lat, lng, zoom]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default OpenLayerComponent;
