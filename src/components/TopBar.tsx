import React from 'react';
import { BellIcon } from 'lucide-react';
import { Logo } from './Logo';
import { IconButton } from './IconButton';

type Mode = 'client' | 'etudiant';

type TopBarProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
};

export function TopBar({ mode, onModeChange }: TopBarProps) {
  const isStudent = mode === 'etudiant';

  return (
    <header className="relative z-[600] flex items-center justify-between gap-2 px-4 py-2 bg-[#0B1120]/95 backdrop-blur-md border-b border-[#1E293B]">
      <div className="min-w-0">
        <Logo size="sm" />
        <p className="mt-0.5 text-[11px] leading-tight text-[#94A3B8] truncate">
          Micro-jobs étudiants • Mada
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          role="switch"
          aria-checked={isStudent}
          aria-label="Basculer entre Mode Client et Mode Étudiant"
          onClick={() => onModeChange(isStudent ? 'client' : 'etudiant')}
          className="flex items-center min-h-[44px]">
          
          <span
            className={`flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-full border text-xs font-semibold transition-colors ${
            isStudent ?
            'bg-[#10B981]/10 border-[#10B981]/40 text-[#F8FAFC]' :
            'bg-[#1E293B] border-[#334155] text-[#F8FAFC]'}`
            }>
            
            <span className="relative flex h-2 w-2">
              {isStudent &&
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75 animate-ping" />
              }
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                isStudent ? 'bg-[#10B981]' : 'bg-[#2563EB]'}`
                } />
              
            </span>
            {isStudent ? 'Mode Étudiant (Dispo)' : 'Mode Client'}
          </span>
        </button>
        <IconButton icon={BellIcon} label="Notifications" badge />
      </div>
    </header>);

}