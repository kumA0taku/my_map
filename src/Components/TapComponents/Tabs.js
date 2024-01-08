import React, { useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
// Import our Map Components
import LeafletComponent from "../MapComponents/LeafletComponent";
import OpenLayerComponent from "../MapComponents/OpenLayerComponent";
// import OpenLayersComponent from "../MapComponents/OpenLayersComponent";


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("mapbox");

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Mapbox" id="mapbox" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem title="Leaflet" id="leaflet" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem title="OpenLayers" id="openlayers" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem title="ArcGIS" id="arcgis" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem title="Carto" id="carto" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>

      <div className="outlet">
        <TabContent id="mapbox" activeTab={activeTab}>
          <p>Mapbox works!</p>
        </TabContent>
        <TabContent id="leaflet" activeTab={activeTab}>
          <LeafletComponent></LeafletComponent>
        </TabContent>
        <TabContent id="openlayers" activeTab={activeTab}>
            <OpenLayerComponent></OpenLayerComponent>
        </TabContent>
        <TabContent id="arcgis" activeTab={activeTab}>
          <p>ArcGIS works!</p>
        </TabContent>
        <TabContent id="carto" activeTab={activeTab}>
          <p>Carto works!</p>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
