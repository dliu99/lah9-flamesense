'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {Button} from "@/components/ui/button"

const fireIcon = new L.Icon({
    iconUrl: '/fire.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -16]
  });
  
  const crossIcon = new L.Icon({
    iconUrl: '/cross.png',
    iconSize: [16, 16],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

export default function mapComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/get-fires')
      .then(res => res.ok ? res.json() : Promise.reject('fetch failed'))
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  function dmsToDecimal(deg, min, sec, positive = true) {
    const dec = Math.abs(deg) + (min / 60) + (sec / 3600);
    return positive ? dec : -dec;
  }

  if (!data) return <div>loading...</div>;

  return (
    <MapContainer center={[36.7783, -119.4179]} zoom={6} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" />
      {data.map((feature) => {
        const lat = dmsToDecimal(
          Number(feature.lat_deg), 
          Number(feature.lat_min) || 0, 
          Number(feature.lat_sec) || 0, 
          true
        );
        const lng = dmsToDecimal(
          Number(feature.long_deg), 
          Number(feature.long_min) || 0, 
          Number(feature.long_sec) || 0, 
          false
        );
        return (
          <Marker key={feature.id} position={[lat, lng]} icon={feature.type === "Wildfire" ? fireIcon : crossIcon}>
            <Popup closeButton={false} className="bg-gray-500 rounded-lg">
              <h1 className="text-lg font-bold">{feature.title}</h1>
              <p className="text-md"><b>Type:</b> {feature.type}</p>
              <p className="text-md"><b>Size:</b> {feature.size || 0} acres</p>
              <p className="text-md"><b>Updated:</b> {feature.changed}</p>
              <p className="text-md"><b>Incident ID:</b> {feature.id}</p>
              <Button className="w-full" onClick={() => console.log("hi")}>Simulate</Button>

            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
