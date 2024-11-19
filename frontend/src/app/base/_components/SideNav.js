"use client"
import React from 'react'
import Image from 'next/image'
import { CircleHelp, GraduationCap, Hand, LayoutIcon, NotebookPen, PencilIcon, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutIcon,
      path: '/teacher/dashboard'
    },
    {
      id: 2,
      name: 'Students',
      icon: GraduationCap,
      path: '/teacher/students'
    },
    {
      id: 3,
      name: 'Take Attendance',
      icon: NotebookPen,
      path: '/teacher/take-attendance'
    },
    {
      id: 4,
      name: 'Check Attendance',
      icon: Hand,
      path: '/teacher/check-attendance'
    },
    {
      id: 5,
      name: 'Edit Attendance',
      icon: PencilIcon,
      path: '/teacher/edit-attendance'
    },
  ]
  const path = usePathname();

  return (
    <div className='border shadow-md h-screen p-5'>
      <Link href='/teacher/dashboard'>
        <Image src={'../logo.svg'} width={150} height={35} alt='logo' />
      </Link>

      <hr className='my-4' />

      {menuList.map((menu, index) => (
        <Link href={menu.path} key={index}>
          <h2 className={`flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2
          ${path == menu.path && 'bg-primary text-white'}
          `}>
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      <div className='flex gap-2 items-center bottom-5 fixed p-4 hover:bg-slate-200 rounded-lg cursor-pointer'>
        <CircleHelp />
        <div>
          <h2>Help Center</h2>
        </div>
      </div>
    </div>
  )
}

export default SideNav
