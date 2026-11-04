import { PackageIcon, DumbbellIcon, BookOpenIcon, FileTextIcon } from 'lucide-react';
import type { RequestCategory } from '../types/map';

export const requestCategories: {
  id: RequestCategory;
  label: string;
  icon: typeof PackageIcon;
}[] = [
{ id: 'demenagement', label: 'Déménagement', icon: PackageIcon },
{ id: 'manutention', label: 'Manutention', icon: DumbbellIcon },
{ id: 'cours', label: 'Cours', icon: BookOpenIcon },
{ id: 'distribution', label: 'Distribution', icon: FileTextIcon }];