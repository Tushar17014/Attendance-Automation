"use client"
import React from 'react'
import Image from 'next/image'
import { BookOpenText, CircleHelp, GraduationCap, Hand, LayoutIcon, NotebookPen, Presentation } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
  const menuList = [
    {
      id: 1,
      type: 1,
      name: 'Dashboard',
      icon: LayoutIcon,
      path: '/admin/dashboard'
    },
    {
      id: 2,
      type: 1,
      name: 'All Students',
      icon: GraduationCap,
      path: '/admin/students'
    },
    {
      id: 3,
      type: 1,
      name: 'All Teachers',
      icon: Presentation,
      path: '/admin/teachers'
    },
    {
      id: 4,
      type: 1,
      name: 'Add Student',
      icon: NotebookPen,
      path: '/admin/add-student'
    },
    {
      id: 5,
      type: 1,
      name: 'Add Teacher',
      icon: Hand,
      path: '/admin/add-teacher'
    },
    {
      id: 6,
      type: 1,
      name: 'Add Course',
      icon: BookOpenText,
      path: '/admin/add-course'
    }
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
            {menu.type == 1 ?
              <menu.icon />
              :
              menu.icon
            }
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
