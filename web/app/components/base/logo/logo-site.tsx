import type { FC } from 'react'
import classNames from '@/utils/classnames'

type LogoSiteProps = {
  className?: string
}

const LogoSite: FC<LogoSiteProps> = ({
  className,
}) => {
  return (
    <img
      src='/logo/logo-site.svg'
      className={classNames('block w-auto h-9', className)}
      alt='logo'
    />
  )
}

export default LogoSite
