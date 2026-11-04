import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ZapIcon } from 'lucide-react';
import { MissionMap } from '../components/MissionMap';
import { RequestSheet } from '../components/RequestSheet';
import { studentPins } from '../data/mapMarkers';

type MapHomeProps = {
  sheetOpenByDefault: boolean;
};

export function MapHome({ sheetOpenByDefault }: MapHomeProps) {
  const [expanded, setExpanded] = useState(sheetOpenByDefault);

  return (
    <div className="relative flex-1 overflow-hidden">
      <MissionMap />

      <div className="absolute left-4 top-4 z-[500]">
        <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-[#0B1120]/90 backdrop-blur-md border border-[#334155] text-xs font-medium text-[#F8FAFC] shadow-md">
          <span className="h-2 w-2 rounded-full bg-[#10B981]" aria-hidden="true" />
          {studentPins.length} étudiants dispo à proximité
        </div>
      </div>

      <AnimatePresence>
        {!expanded &&
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-x-0 bottom-[132px] z-[650] flex justify-center px-4">
          
            <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 h-14 px-6 rounded-full bg-[#F97316] text-white font-['Poppins'] font-semibold text-[15px] shadow-cta ring-4 ring-[#F97316]/20 active:scale-[0.98] hover:bg-[#EA6A0C] transition">
            
              <ZapIcon className="h-5 w-5 fill-white" />
              Publier un besoin urgent
            </button>
          </motion.div>
        }
      </AnimatePresence>

      <RequestSheet expanded={expanded} onExpandedChange={setExpanded} />
    </div>);

}