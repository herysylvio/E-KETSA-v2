import type { MissionMarker, StudentPin } from '../types/map';

export const userPosition: [number, number] = [-18.9105, 47.5385];

export const studentPins: StudentPin[] = [
{ id: 's1', name: 'Ali', distance: '800m', position: [-18.9048, 47.5422] },
{ id: 's2', name: 'Mirana', distance: '1.2km', position: [-18.9182, 47.5318] },
{ id: 's3', name: 'Tojo', distance: '1.5km', position: [-18.9012, 47.5296] }];


export const missionMarkers: MissionMarker[] = [
{
  id: 'm1',
  title: 'Déménagement Ankatso',
  category: 'demenagement',
  budget: 35000,
  position: [-18.9196, 47.5512]
},
{
  id: 'm2',
  title: 'Distribution Analakely',
  category: 'distribution',
  budget: 15000,
  position: [-18.9068, 47.5232]
}];