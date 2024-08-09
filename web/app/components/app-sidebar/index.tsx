import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Button from '../base/button'
import NavLink from './navLink'
import type { NavIcon } from './navLink'
import AppBasic from './basic'
import AppInfo from './app-info'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'
import {
  AlignLeft01,
  AlignRight01,
} from '@/app/components/base/icons/src/vender/line/layout'
import { useStore as useAppStore } from '@/app/components/app/store'

export type IAppDetailNavProps = {
  iconType?: 'app' | 'dataset' | 'notion'
  title: string
  desc: string
  icon: string
  icon_background: string
  isVertical?: boolean
  navigation: Array<{
    name: string
    href: string
    icon: NavIcon
    selectedIcon: NavIcon
  }>
  extraInfo?: (modeState: string) => React.ReactNode
}

const AppDetailNav = ({ title, desc, icon, icon_background, navigation, extraInfo, iconType = 'app', isVertical = true }: IAppDetailNavProps) => {
  const { appSidebarExpand, setAppSiderbarExpand } = useAppStore(useShallow(state => ({
    appSidebarExpand: state.appSidebarExpand,
    setAppSiderbarExpand: state.setAppSiderbarExpand,
  })))
  const media = useBreakpoints()
  const isMobile = media === MediaType.mobile
  const expand = appSidebarExpand === 'expand'

  const handleToggle = (state: string) => {
    setAppSiderbarExpand(state === 'expand' ? 'collapse' : 'expand')
  }

  useEffect(() => {
    if (appSidebarExpand) {
      localStorage.setItem('app-detail-collapse-or-expand', appSidebarExpand)
      setAppSiderbarExpand(appSidebarExpand)
    }
  }, [appSidebarExpand, setAppSiderbarExpand])

  const goback = () => {
    window.location.href = '/apps'
  }
  return (
    <div
      className={`
        shrink-0 flex bg-white border-r border-gray-200 transition-all
        ${expand ? 'w-[216px]' : 'w-14'}
        ${isVertical ? 'flex-col' : 'flex-row w-full justify-between py-1 mb-1 px-4'}
      `}
    >
      <div
        className={`
          flex items-center
          shrink-0
          ${isVertical ? (expand ? 'p-3' : 'p-2') : ''}
        `}
      >
        {!isVertical && <div className='flex items-center mr-4 cursor-pointer' onClick={() => { goback() }}>
          <Button className='h-6 px-1 py-0'><ArrowLeftIcon className='w-4 h-4' /></Button>
          <span className='text-gray-700 text-sm ml-2'>返回</span>
        </div>}
        {iconType === 'app' && (
          <AppInfo expand={expand}/>
        )}
        {iconType !== 'app' && (
          <AppBasic
            mode={appSidebarExpand}
            iconType={iconType}
            icon={icon}
            icon_background={icon_background}
            name={title}
            type={desc}
          />
        )}
      </div>
      {!expand && (
        <div className='mt-1 mx-auto w-6 h-[1px] bg-gray-100'/>
      )}
      <nav
        className={`
           bg-white
          ${isVertical ? (expand ? 'p-4 grow space-y-1' : 'px-2.5 py-4 grow space-x-1') : 'flex items-center p-0'}
        `}
      >
        {navigation.map((item, index) => {
          return (
            <NavLink key={index} mode={appSidebarExpand} iconMap={{ selected: item.selectedIcon, normal: item.icon }} name={item.name} href={item.href} />
          )
        })}
        {extraInfo && extraInfo(appSidebarExpand)}
      </nav>
      {
        (isVertical && !isMobile) && (
          <div
            className={`
              shrink-0 py-3
              ${expand ? 'px-6' : 'px-4'}
            `}
          >
            <div
              className='flex items-center justify-center w-6 h-6 text-gray-500 cursor-pointer'
              onClick={() => handleToggle(appSidebarExpand)}
            >
              {
                expand
                  ? <AlignLeft01 className='w-[14px] h-[14px]' />
                  : <AlignRight01 className='w-[14px] h-[14px]' />
              }
            </div>
          </div>
        )
      }
      {
        !isVertical && <div></div>
      }
    </div>
  )
}

export default React.memo(AppDetailNav)
