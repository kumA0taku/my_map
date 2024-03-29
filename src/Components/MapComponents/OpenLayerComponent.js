import React, { useEffect, useState, useRef } from "react";
import "ol/ol.css";
import "ol-popup/src/ol-popup.css";
import Map from "ol/Map";
import View from "ol/View";
import { transform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
import TileWMS from "ol/source/TileWMS";
import LayerSwitcher from "ol-layerswitcher";

// Import styling
import "../../App.css";

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
            new TileLayer({
              title: "OSM",
              type: "base",
              visible: true,
              source: new OSM({}),
            }),
          ],
        }),
        new LayerGroup({
          title: "Overlays",
          fold: "open",
          layers: [
            new LayerGroup({
              title: "Boundaries",
              fold: "open",
              layers: [
                new TileLayer({
                  title: "Counties",
                  visible: true,
                  opacity: 0.5,
                  source: new TileWMS({
                    url: "https://ows.terrestris.de/osm/service",
                    params: {
                      LAYERS: "OSM-WMS",
                    },
                  }),
                }),
                new TileLayer({
                  title: "States",
                  visible: false,
                  source: new TileWMS({
                    url: "https://ows.terrestris.de/osm/service",
                    params: {
                      LAYERS: "OSM-WMS",
                    },
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
      view: new View({
        center: transform([lng, lat], "EPSG:4326", "EPSG:3857"),
        zoom: zoom,
      }),
    });

    const layerSwitcher = new LayerSwitcher({
      target: mapContainerRef.current,
      tipLabel: "Légende", // Optional label for button
      groupSelectStyle: "group", // Can be 'children' [default], 'group' or 'none'
    });
    map.current.addControl(layerSwitcher);

    return () => {
      map.current.setTarget(null);
    };
  }, [lat, lng, zoom]);
  return <div className="map-container" ref={mapContainerRef} />;
};

export default OpenLayerComponent;