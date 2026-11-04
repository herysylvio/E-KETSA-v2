import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2Icon, ChevronUpIcon, PlusIcon, RotateCcwIcon, SendIcon } from 'lucide-react';
import { Chip } from './Chip';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { PriceTag } from './PriceTag';
import { requestCategories } from '../data/categories';
import { useRequestForm } from '../hooks/useRequestForm';

type RequestSheetProps = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
};

const QUICK_AMOUNTS = [2000, 5000];

export function RequestSheet({ expanded, onExpandedChange }: RequestSheetProps) {
  const form = useRequestForm();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (expanded) {
      const t = setTimeout(() => textareaRef.current?.focus({ preventScroll: true }), 250);
      return () => clearTimeout(t);
    }
  }, [expanded]);

  const handleSubmit = async () => {
    const ok = await form.submit();
    if (ok) onExpandedChange(false);
  };

  return (
    <motion.section
      aria-labelledby="request-sheet-title"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        if (info.offset.y < -40) onExpandedChange(true);
        if (info.offset.y > 40) onExpandedChange(false);
      }}
      className="absolute inset-x-0 bottom-0 z-[700] rounded-t-2xl bg-[#1E293B] border-t border-x border-[#334155] shadow-lg">
      
      <button
        type="button"
        onClick={() => onExpandedChange(!expanded)}
        aria-expanded={expanded}
        aria-controls="request-sheet-body"
        className="w-full flex flex-col items-center pt-2 pb-1 min-h-[44px]">
        
        <span className="h-1 w-10 rounded-full bg-[#334155]" aria-hidden="true" />
        <span className="mt-2 w-full flex items-center justify-between px-4">
          <span id="request-sheet-title" className="font-['Poppins'] text-base font-semibold text-[#F8FAFC]">
            De quoi avez-vous besoin ?
          </span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronUpIcon className="h-5 w-5 text-[#94A3B8]" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {form.status === 'success' &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          role="status"
          className="px-4 overflow-hidden">
          
            <div className="mt-1 flex items-center gap-2 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-2 text-sm text-[#F8FAFC]">
              <CheckCircle2Icon className="h-4 w-4 text-[#10B981] shrink-0" />
              Besoin publié — les étudiants proches sont notifiés.
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <div
        role="group"
        aria-label="Catégorie du besoin"
        className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        {requestCategories.map(({ id, label, icon: Icon }) =>
        <Chip
          key={id}
          size="sm"
          showCheck={false}
          icon={<Icon className="h-4 w-4" />}
          selected={form.category === id}
          onSelectedChange={() => form.setCategory(id)}
          className="shrink-0 min-h-[44px]">
          
            {label}
          </Chip>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded &&
        <motion.div
          id="request-sheet-body"
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          className="overflow-hidden">
          
            <div className="px-4 pb-4 space-y-4">
              <Textarea
              ref={textareaRef}
              label="Description de votre besoin"
              placeholder="Ex : Aide pour porter 10 cartons au 3e étage, samedi matin"
              rows={3}
              maxLength={280}
              showCount
              resize="none"
              value={form.description}
              onChange={(e) => form.updateDescription(e.target.value)}
              error={form.error} />
            

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#94A3B8]">Budget proposé</span>
                  <button
                  type="button"
                  onClick={form.resetBudget}
                  className="flex items-center gap-1 min-h-[44px] px-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC]">
                  
                    <RotateCcwIcon className="h-3.5 w-3.5" />
                    Réinitialiser
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl bg-[#0B1120] border border-[#334155] p-3">
                  <PriceTag amount={form.budget} size="xl" aria-live="polite" />
                  <div className="flex gap-2">
                    {QUICK_AMOUNTS.map((amount) =>
                  <button
                    key={amount}
                    type="button"
                    onClick={() => form.addToBudget(amount)}
                    className="flex items-center gap-0.5 min-h-[44px] px-3 rounded-full bg-[#1E293B] border border-[#334155] text-xs font-['Poppins'] font-semibold text-[#F8FAFC] hover:border-[#2563EB] active:scale-95 transition">
                    
                        <PlusIcon className="h-3 w-3" />
                        {amount === 2000 ? '2 000' : '5 000'} Ar
                      </button>
                  )}
                  </div>
                </div>
              </div>

              <Button
              fullWidth
              size="lg"
              loading={form.status === 'submitting'}
              leftIcon={<SendIcon className="h-5 w-5" />}
              onClick={handleSubmit}
              className="shadow-cta">
              
                Publier
              </Button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.section>);

}