import React, { useState } from 'react';
import { MapIcon, BriefcaseIcon, MessageCircleIcon, WalletIcon, UserIcon } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { MapHome } from './pages/MapHome';

type AppProps = {
  initialMode?: 'client' | 'etudiant';
  sheetOpenByDefault?: boolean;
};

const NAV_ITEMS = [
{ key: 'carte', label: 'Carte', icon: MapIcon },
{ key: 'services', label: 'Services', icon: BriefcaseIcon },
{ key: 'messages', label: 'Messages', icon: MessageCircleIcon, badge: 2 },
{ key: 'portefeuille', label: 'Portefeuille', icon: WalletIcon },
{ key: 'profil', label: 'Profil', icon: UserIcon }];


export function App({ initialMode = 'client', sheetOpenByDefault = false }: AppProps) {
  const [mode, setMode] = useState<'client' | 'etudiant'>(initialMode);
  const [tab, setTab] = useState('carte');

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC]">
      <div className="max-w-md mx-auto relative h-[100dvh] flex flex-col pb-16 overflow-hidden">
        <TopBar mode={mode} onModeChange={setMode} />
        <main className="relative flex-1 flex flex-col">
          <MapHome key={String(sheetOpenByDefault)} sheetOpenByDefault={sheetOpenByDefault} />
        </main>
        <BottomNav activeKey={tab} onChange={setTab} items={NAV_ITEMS} className="z-[800]" />
      </div>
    </div>);

}