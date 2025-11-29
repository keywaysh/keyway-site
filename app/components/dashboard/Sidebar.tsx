'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { XMarkIcon, CubeIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { KeywayLogo } from '../logo'

const navItems = [
  {
    label: 'Vaults',
    href: '/dashboard',
    icon: CubeIcon,
  },
  {
    label: 'Activity',
    href: '/dashboard/activity',
    icon: ClockIcon,
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-gray-900">
          <KeywayLogo className="w-5 h-5 text-primary" />
          <span>Keyway</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-200">
        <Link
          href="https://docs.keyway.sh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <BookOpenIcon className="h-5 w-5" />
          Docs
        </Link>
      </div>
    </>
  )
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 border-r border-gray-200 bg-white/50 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <Dialog open={isOpen} onClose={onClose} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-200 flex flex-col">
          <SidebarContent onClose={onClose} />
        </DialogPanel>
      </Dialog>
    </>
  )
}
