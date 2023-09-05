import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidBarItemProps  {
        icon: IconType;
        label: string;
        active: boolean;
        href: string;
    }

const SidBarItem: React.FC<SidBarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
  return (
    <Link 
        href={href}
        className={ twMerge(`
          flex items-center
          w-full h-auto font-medium text-md
          cursor-pointer gap-x-4 py-1
          hover:text-white
          text-neutral-400
          transition
         `,
         active && "text-white")}
    >
      <Icon size={26} />
      <p className="w-full truncate"> {label} </p>
    </Link>
  )
}

export default SidBarItem
