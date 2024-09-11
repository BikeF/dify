'use client'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useTranslation } from 'react-i18next'
import {
  RiDashboard2Fill,
  RiDashboard2Line,
  RiFileList3Fill,
  RiFileList3Line,
  RiTerminalBoxFill,
  RiTerminalBoxLine,
  RiTerminalWindowFill,
  RiTerminalWindowLine,
} from '@remixicon/react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useStore } from '@/app/components/app/store'
import type { NavIcon } from '@/app/components/app-sidebar/navLink'
import NavLink from '@/app/components/app-sidebar/navLink'
import { useAppContext } from '@/context/app-context'

export type AppNavProps = {
}
const AppNav: FC<AppNavProps> = (props) => {
  const segment = useSelectedLayoutSegment()

  console.log('122s3123f', segment)
  const { appDetail, setAppDetail, setAppSiderbarExpand } = useStore(useShallow(state => ({
    appDetail: state.appDetail,
    setAppDetail: state.setAppDetail,
    setAppSiderbarExpand: state.setAppSiderbarExpand,
  })))
  const { t } = useTranslation()
  const { isCurrentWorkspaceManager, isCurrentWorkspaceEditor } = useAppContext()

  const getNavigations = useCallback((appId: string, isCurrentWorkspaceManager: boolean, isCurrentWorkspaceEditor: boolean, mode: string) => {
    const navs = [
      ...(isCurrentWorkspaceEditor
        ? [{
          name: t('common.appMenus.promptEng'),
          href: `/app/${appId}/${(mode === 'workflow' || mode === 'advanced-chat') ? 'workflow' : 'configuration'}`,
          icon: RiTerminalWindowLine,
          selectedIcon: RiTerminalWindowFill,
        }]
        : []
      ),
      {
        name: t('common.appMenus.apiAccess'),
        href: `/app/${appId}/develop`,
        icon: RiTerminalBoxLine,
        selectedIcon: RiTerminalBoxFill,
      },
      ...(isCurrentWorkspaceManager
        ? [{
          name: mode !== 'workflow'
            ? t('common.appMenus.logAndAnn')
            : t('common.appMenus.logs'),
          href: `/app/${appId}/logs`,
          icon: RiFileList3Line,
          selectedIcon: RiFileList3Fill,
        }]
        : []
      ),
      {
        name: t('common.appMenus.overview'),
        href: `/app/${appId}/overview`,
        icon: RiDashboard2Line,
        selectedIcon: RiDashboard2Fill,
      },
    ]
    return navs
  }, [t])

  // const {title, icon, icon_background} = appDetail
  const [navigation, setNavigation] = useState<Array<{
    name: string
    href: string
    icon: NavIcon
    selectedIcon: NavIcon
  }>>([])
  console.log('1232133', appDetail)
  useEffect(() => {
    if (appDetail && appDetail.id) {
      setNavigation(getNavigations(appDetail.id, isCurrentWorkspaceManager, isCurrentWorkspaceEditor, appDetail.mode))
      console.log('1232133', appDetail)
    }
  }, [appDetail])

  return (
    <>
      <div>
        <nav
          className={`
            flex items-center h-auto
          `}
        >
          {navigation.map((item, index) => {
            return (
              <NavLink key={index} mode={'expand'} iconMap={{ selected: item.selectedIcon, normal: item.icon }} name={item.name} href={item.href} />
            )
          })}
          {/* {extraInfo && extraInfo(appSidebarExpand)} */}
        </nav>
      </div>
    </>
  )
}
export default React.memo(AppNav)
