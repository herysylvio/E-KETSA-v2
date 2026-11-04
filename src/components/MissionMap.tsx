import React, { useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocateFixedIcon, PackageIcon, FileTextIcon, BookOpenIcon, DumbbellIcon } from 'lucide-react';
import { IconButton } from './IconButton';
import { missionMarkers, studentPins, userPosition } from '../data/mapMarkers';
import type { MissionMarker } from '../types/map';

const formatAriary = (value: number) =>
Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const missionIcons: Record<MissionMarker['category'], typeof PackageIcon> = {
  demenagement: PackageIcon,
  manutention: DumbbellIcon,
  cours: BookOpenIcon,
  distribution: FileTextIcon
};

export function MissionMap() {
  const [map, setMap] = useState<L.Map | null>(null);

  const icons = useMemo(() => {
    const student = (label: string) =>
    L.divIcon({
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      html: `<div class="ek-pin"><span class="ek-pulse"></span><span class="ek-dot"></span><span class="ek-label">${label}</span></div>`
    });

    const mission = (m: MissionMarker) => {
      const Icon = missionIcons[m.category];
      const svg = renderToStaticMarkup(<Icon size={16} strokeWidth={2.25} color="#FFFFFF" />);
      return L.divIcon({
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `<div class="ek-mission"><span class="ek-mission-core">${svg}</span><span class="ek-mission-label"><strong>${m.title}</strong><em>${formatAriary(m.budget)} Ar</em></span></div>`
      });
    };

    const user = L.divIcon({
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      html: '<div class="ek-user"></div>'
    });

    return { student, mission, user };
  }, []);

  return (
    <div className="absolute inset-0">
      <MapContainer
        ref={setMap}
        center={[-18.9115, 47.5375]}
        zoom={14}
        zoomControl={false}
        className="h-full w-full"
        aria-label="Carte d'Antananarivo">
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO' />
        
        <Marker position={userPosition} icon={icons.user} />
        {studentPins.map((s) =>
        <Marker
          key={s.id}
          position={s.position}
          icon={icons.student(`${s.name} - ${s.distance}`)}
          title={`${s.name}, étudiant disponible à ${s.distance}`} />

        )}
        {missionMarkers.map((m) =>
        <Marker key={m.id} position={m.position} icon={icons.mission(m)} title={m.title} />
        )}
      </MapContainer>

      <div className="absolute right-4 top-16 z-[500]">
        <IconButton
          icon={LocateFixedIcon}
          label="Recentrer sur ma position"
          variant="solid"
          onClick={() => map?.flyTo(userPosition, 15, { duration: 0.6 })} />
        
      </div>
    </div>);

}