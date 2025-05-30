// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issues in Leaflet when using Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const position = [35.78201857827349,  -5.805037859110406];

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
  <Popup className="customPopup">
    <div className="popupContent">
      <h4>KM0 Tanger</h4>
      <p>Your Restaurant & Café</p>
    </div>
  </Popup>
</Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
