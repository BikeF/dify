'use client'
import type { FC } from 'react'
import { Fragment, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSelectedLayoutSegments } from 'next/navigation'
import {
  RiAddLine,
} from '@remixicon/react'
import { Menu, Transition } from '@headlessui/react'
import useSWRInfinite from 'swr/infinite'
import cn from '@/utils/classnames'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'
import AppNav from '@/app/components/header/app-nav'
import DatasetNav from "@/app/components/header/dataset-nav"
import ToolsNav from "@/app/components/header/tools-nav"
import ExploreNav from "@/app/components/header/explore-nav"
import { useAppContext } from "@/context/app-context"
import Button from '@/app/components/base/button'
import CreateAppTemplateDialog from '@/app/components/app/create-app-dialog'
import CreateAppModal from '@/app/components/app/create-app-modal'
import CreateFromDSLModal from '@/app/components/app/create-from-dsl-modal'
import { FileArrow01, FilePlus01, FilePlus02 } from '@/app/components/base/icons/src/vender/line/files'
import { fetchAppList } from '@/service/apps'

import type { AppListResponse } from '@/models/app'
import {
  AlignLeft01,
  AlignRight01,
} from '@/app/components/base/icons/src/vender/line/layout'

const getKey = (
  pageIndex: number,
  previousPageData: AppListResponse,
  activeTab: string,
  keywords: string,
) => {
  if (!pageIndex || previousPageData.has_more) {
    const params: any = { url: 'apps', params: { page: pageIndex + 1, limit: 30, name: keywords } }

    if (activeTab !== 'all')
      params.params.mode = activeTab
    else
      delete params.params.mode

    return params
  }
  return null
}

const navClassName = `
  flex items-center relative mr-0 sm:mr-3 px-3 h-8 rounded-xl
  font-medium text-sm
  cursor-pointer
`

const SideBar: FC = () => {
  const { t } = useTranslation()
  const { isCurrentWorkspaceEditor, isCurrentWorkspaceDatasetOperator } = useAppContext()

  const segments = useSelectedLayoutSegments()
  const lastSegment = segments.slice(-1)[0]
  const isDiscoverySelected = lastSegment === 'apps'
  const isChatSelected = lastSegment === 'chat'

  const media = useBreakpoints()
  const isMobile = media === MediaType.mobile

  const [isLoading, setIsLoading] = useState(false)

  const [showNewAppDialog, setShowNewAppDialog] = useState(false)
  const [showNewAppTemplateDialog, setShowNewAppTemplateDialog] = useState(false)
  const [showCreateFromDSLModal, setShowCreateFromDSLModal] = useState(false)

  const { appId } = useParams()
  const { mutate } = useSWRInfinite(
    appId
      ? (pageIndex: number, previousPageData: AppListResponse) => getKey(pageIndex, previousPageData, 'all', '')
      : () => null,
    fetchAppList,
    { revalidateFirstPage: false },
  )
  const openModal = (state: string) => {
    if (state === 'blank')
      setShowNewAppDialog(true)
    if (state === 'template')
      setShowNewAppTemplateDialog(true)
    if (state === 'dsl')
      setShowCreateFromDSLModal(true)
  }

  // const { appSidebarExpand, setAppSiderbarExpand } = useAppStore(useShallow(state => ({
  //   appSidebarExpand: state.appSidebarExpand,
  //   setAppSiderbarExpand: state.setAppSiderbarExpand,
  // })))
  const [appSidebarExpand, setAppSiderbarExpand] = useState('expand')
  const expand = appSidebarExpand === 'expand'
  const handleToggle = (state: string) => {
    setAppSiderbarExpand(state === 'expand' ? 'collapse' : 'expand')
  }

  return (
    <>
      <div className={`
        relative h-full shrink-0 pt-6 px-4 rounded bg-gray-200 cursor-pointer
        ${expand ? 'w-[200px]' : 'w-14'}
        `}>
        <div>
          <div>
            <Menu as="div" className="relative w-full h-full">
              {() => (
                <>
                  <Menu.Button className='w-full'>
                    <Button
                      tabIndex={0}
                      size="medium"
                      variant="primary-linear"
                      disabled={isLoading}
                      className="w-full mb-8 p-0"
                    >
                      <RiAddLine className='w-4 h-4'/>
                      {expand && t("common.menus.newApp")}
                    </Button>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className={cn(
                      'absolute top-[3px] right-[-198px] min-w-[200px] z-20 bg-white border-[0.5px] border-gray-200 rounded-lg shadow-lg text-sm',
                    )}>
                      <div className='p-1'>
                        <div className={cn('flex items-center px-3 py-[6px] rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700 font-normal')} onClick={() => openModal('blank')}>
                          <FilePlus01 className='shrink-0 mr-2 w-4 h-4 text-gray-600' />
                          {t('app.newApp.startFromBlank')}
                        </div>
                        <div className={cn('flex items-center px-3 py-[6px] rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700 font-normal')} onClick={() => openModal('template')}>
                          <FilePlus02 className='shrink-0 mr-2 w-4 h-4 text-gray-600' />
                          {t('app.newApp.startFromTemplate')}
                        </div>
                      </div>
                      <div className='p-1 border-t border-gray-100'>
                        <div className={cn('flex items-center px-3 py-[6px] rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700 font-normal')} onClick={() => openModal('dsl')}>
                          <FileArrow01 className='shrink-0 mr-2 w-4 h-4 text-gray-600' />
                          {t('app.importDSL')}
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
          <div className="flex flex-col items-center gap-3">
            {!isCurrentWorkspaceDatasetOperator && <ExploreNav isVertical={true} expand={expand} className={navClassName} />}
            {!isCurrentWorkspaceDatasetOperator && <AppNav isVertical={true} expand={expand} />}
            {(isCurrentWorkspaceEditor || isCurrentWorkspaceDatasetOperator) && <DatasetNav isVertical={true} expand={expand} />}
            {!isCurrentWorkspaceDatasetOperator && <ToolsNav isVertical={true} expand={expand} className={navClassName} />}
          </div>
        </div>

        <div
          className={`
            absolute bottom-2 py-3
            ${expand ? '' : ''}
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
      </div>
      <CreateAppModal
        show={showNewAppDialog}
        onClose={() => setShowNewAppDialog(false)}
        onSuccess={() => mutate()}
      />
      <CreateAppTemplateDialog
        show={showNewAppTemplateDialog}
        onClose={() => setShowNewAppTemplateDialog(false)}
        onSuccess={() => mutate()}
      />
      <CreateFromDSLModal
        show={showCreateFromDSLModal}
        onClose={() => setShowCreateFromDSLModal(false)}
        onSuccess={() => mutate()}
      />
    </>
  )
}

export default memo(SideBar)
