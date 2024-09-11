'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import type { INavSelectorProps } from './nav-selector'
import NavSelector from './nav-selector'
import classNames from '@/utils/classnames'
import { useStore as useAppStore } from '@/app/components/app/store'

type INavProps = {
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  text: string
  activeSegment: string | string[]
  link: string
  isApp: boolean
  isVertical?: boolean
  expand?: boolean
} & INavSelectorProps

const Nav = ({
  icon,
  activeIcon,
  text,
  activeSegment,
  link,
  curNav,
  navs,
  createText,
  onCreate,
  onLoadmore,
  isApp,
  isVertical,
  expand,
}: INavProps) => {
  const setAppDetail = useAppStore(state => state.setAppDetail)
  const [hovered, setHovered] = useState(false)
  const segment = useSelectedLayoutSegment()
  const isActivated = Array.isArray(activeSegment) ? activeSegment.includes(segment!) : segment === activeSegment

  return (
    <div className={`
      flex items-center h-8 mr-0 px-0.5 rounded-xl text-sm shrink-0 font-medium
      ${isActivated && 'bg-white shadow-md font-semibold'}
      ${isVertical ? 'w-full' : ''}
      ${!curNav && !isActivated && 'hover:bg-gray-200'}
      ${expand ? 'sm:mr-3' : ''}
    `}>
      <Link href={link}>
        <div
          onClick={() => setAppDetail()}
          className={classNames(`
            flex items-center h-7 cursor-pointer rounded-[10px]
            ${isActivated ? 'text-primary-600' : 'text-gray-500'}
            ${curNav && isActivated && 'hover:bg-primary-50'}
            ${expand ? 'px-2.5' : ''}
          `)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* <div className={expand ? 'mr-2' : 'ml-[2px]'}>
            {
              (hovered && curNav)
                ? <ArrowNarrowLeft className='w-4 h-4' />
                : isActivated
                  ? activeIcon
                  : icon
            }
          </div> */}
          {expand && text}
        </div>
      </Link>
      {
        curNav && isActivated && (
          <>
            <div className='font-light text-gray-300 '>/</div>
            <NavSelector
              isApp={isApp}
              curNav={curNav}
              navs={navs}
              createText={createText}
              onCreate={onCreate}
              onLoadmore={onLoadmore}
            />
          </>
        )
      }
    </div>
  )
}

export default Nav
