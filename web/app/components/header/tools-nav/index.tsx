'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import classNames from '@/utils/classnames'
type ToolsNavProps = {
  className?: string
  isVertical?: boolean
  expand?: boolean
}

const ToolsNav = ({
  className,
  isVertical = false,
  expand = true,
}: ToolsNavProps) => {
  const { t } = useTranslation()
  const selectedSegment = useSelectedLayoutSegment()
  const activated = selectedSegment === 'tools'

  return (
    <Link href="/tools" className={classNames(
      className, 'group',
      activated && 'bg-white shadow-md',
      activated ? 'text-primary-600' : 'text-gray-500 hover:bg-gray-200',
      isVertical && 'w-full',
      expand ? '' : '!p-0 !mr-0',
    )}>
      {/* {
        actived
          ? <RiHammerFill className={classNames('w-4 h-4', expand ? 'mr-2' : 'ml-1')} />
          : <RiHammerLine className={classNames('w-4 h-4', expand ? 'mr-2' : 'ml-1')} />
      } */}
      {expand && t('common.menus.tools')}
    </Link>
  )
}

export default ToolsNav
