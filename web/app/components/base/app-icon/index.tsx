'use client'

import type { FC } from 'react'
import { init } from 'emoji-mart'
import data from '@emoji-mart/data'
import style from './style.module.css'
import classNames from '@/utils/classnames'
import type { AppIconType } from '@/types/app'

init({ data })

export type AppIconProps = {
  size?: 'xs' | 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  iconType?: AppIconType | null
  icon?: string
  background?: string | null
  imageUrl?: string | null
  className?: string
  innerIcon?: React.ReactNode
  onClick?: () => void
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = false,
  iconType,
  icon,
  background,
  imageUrl,
  className,
  innerIcon,
  onClick,
}) => {
  const wrapperClassName = classNames(
    style.appIcon,
    size !== 'medium' && style[size],
    rounded && style.rounded,
    className ?? '',
    'overflow-hidden',
  )

  const isValidImageIcon = iconType === 'image' && imageUrl

  // 当imageUrl加载失败，且imageUrl是以“/files”开头时，要让他显示成图片/images/bot-avatar.jpg
  const defaultImageUrl = '/images/bot-avatar.jpg'
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (imageUrl && imageUrl.startsWith('/files'))
      e.currentTarget.src = defaultImageUrl // 修改为默认头像
  }
  return <span
    className={wrapperClassName}
    style={{ background: isValidImageIcon ? undefined : (background || '#FFEAD5') }}
    onClick={onClick}
  >
    {isValidImageIcon
      ? <img src={imageUrl} className="w-full h-full" alt="app icon" onError={handleError} />
      : (innerIcon || ((icon && icon !== '') ? <em-emoji id={icon} /> : <em-emoji id='🤖' />))
    }
  </span>
}

export default AppIcon
