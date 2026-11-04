export type StudentPin = {
  id: string;
  name: string;
  distance: string;
  position: [number, number];
};

export type MissionMarker = {
  id: string;
  title: string;
  category: 'demenagement' | 'manutention' | 'cours' | 'distribution';
  budget: number;
  position: [number, number];
};

export type RequestCategory = MissionMarker['category'];