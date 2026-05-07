'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Location } from '@/payload-types'

// Risolve il problema dei marker icon di leaflet quando bundlato.
const icon = L.icon({
  iconRetinaUrl:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="82" viewBox="0 0 25 41"><path fill="#3a52c4" stroke="#fff" stroke-width="1.2" d="M12.5.5C5.6.5.5 5.6.5 12.5c0 9 12 28 12 28s12-19 12-28C24.5 5.6 19.4.5 12.5.5Z"/><circle cx="12.5" cy="12.5" r="4.5" fill="#fff"/></svg>',
    ),
  iconUrl:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41"><path fill="#3a52c4" stroke="#fff" stroke-width="1.2" d="M12.5.5C5.6.5.5 5.6.5 12.5c0 9 12 28 12 28s12-19 12-28C24.5 5.6 19.4.5 12.5.5Z"/><circle cx="12.5" cy="12.5" r="4.5" fill="#fff"/></svg>',
    ),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export function LocationMap({ location }: { location: Location }) {
  useEffect(() => {
    // noop: importa css side-effect e l'icona è già definita sopra
  }, [])

  if (!location.coordinates) return null
  // Payload point: [lng, lat]
  const [lng, lat] = location.coordinates as unknown as [number, number]

  return (
    <div className="overflow-hidden rounded-xl border border-ink-200">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: 320, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.address}
            <br />
            {location.zip} {location.city} ({location.province})
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
