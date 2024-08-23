'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import classNames from '@/utils/classnames'
type ExploreNavProps = {
  className?: string
  isVertical?: boolean
  expand?: boolean
}

const ExploreNav = ({
  className,
  isVertical = false,
  expand = true,
}: ExploreNavProps) => {
  const { t } = useTranslation()
  const selectedSegment = useSelectedLayoutSegment()
  const actived = selectedSegment === 'explore'

  return (
    <Link href="/explore/apps" className={classNames(
      className, 'group',
      actived && 'bg-white shadow-md',
      actived ? 'text-primary-600' : 'text-gray-500 hover:bg-gray-200',
      isVertical ? 'w-full' : '',
      expand ? '' : '!mr-0 px-0',
    )}>
      {/* {
        actived
          ? <RiPlanetFill className={classNames('w-4 h-4', expand ? 'mr-2' : 'ml-1')} />
          : <RiPlanetLine className={classNames('w-4 h-4', expand ? 'mr-2' : 'ml-1')} />
      } */}
      {expand && t('common.menus.explore')}
    </Link>
  )
}

export default ExploreNav
