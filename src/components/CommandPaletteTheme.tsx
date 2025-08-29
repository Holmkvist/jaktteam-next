'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type ThemeMode = 'system' | 'light' | 'dark';

export default function CommandPaletteTheme() {
  const [open, setOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme(); // theme = vald, resolvedTheme = faktisk
  const [mounted, setMounted] = useState(false);

  // undvik hydration-mismatch
  useEffect(() => setMounted(true), []);

  // Hotkey: Ctrl/Cmd + Shift + K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === 'k'
      ) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!mounted) return null; // vänta tills klienten är monterad

  const options: {
    id: ThemeMode;
    name: string;
    desc: string;
    icon: any;
    kbd: string;
  }[] = [
    {
      id: 'system',
      name: 'System',
      desc: 'Följ datorns tema',
      icon: ComputerDesktopIcon,
      kbd: 'S',
    },
    { id: 'light', name: 'Ljus', desc: 'Ljust tema', icon: SunIcon, kbd: 'L' },
    { id: 'dark', name: 'Mörk', desc: 'Mörkt tema', icon: MoonIcon, kbd: 'D' },
  ];

  return (
    <Dialog
      className="relative z-50"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 transition-opacity data-[closed]:opacity-0" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel className="mx-auto max-w-md transform overflow-hidden rounded-xl bg-white/90 shadow-2xl outline-1 outline-black/5 backdrop-blur-sm transition-all data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-gray-900/90 dark:-outline-offset-1 dark:outline-white/10">
          <div className="border-b px-4 py-3 dark:border-white/10">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Byt tema (Ctrl/⌘ + Shift + K)
            </p>
          </div>

          <ul className="divide-y dark:divide-white/10">
            {options.map((opt) => {
              const ActiveIcon = opt.icon;
              const isActive =
                opt.id === 'system'
                  ? theme === 'system'
                  : resolvedTheme === opt.id;

              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setTheme(opt.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-900/5 dark:hover:bg-white/5 ${isActive ? 'bg-gray-900/5 dark:bg-white/5' : ''}`}
                  >
                    <ActiveIcon className="size-5 shrink-0 text-gray-500 dark:text-gray-400" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {opt.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        {opt.desc}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <kbd className="rounded border px-1">{opt.kbd}</kbd>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
