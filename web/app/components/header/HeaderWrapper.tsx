'use client'
import { usePathname } from 'next/navigation'
import s from './index.module.css'
import classNames from '@/utils/classnames'

type HeaderWrapperProps = {
  children: React.ReactNode
}

const HeaderWrapper = ({
  children,
}: HeaderWrapperProps) => {
  const pathname = usePathname()
  console.log('123123', pathname)
  const isBordered = ['/apps', '/datasets', '/datasets/create', '/tools'].includes(pathname)

  const isAppEdit = /\/app\/[a-z|0-9|\-]+\/[configuration|workflow|develop|logs|overview]/.test(pathname)
  return (
    <>
      {!isAppEdit && <div className={classNames(
        'sticky top-0 left-0 right-0 z-30 flex flex-col bg-white grow-0 shrink-0 basis-auto min-h-[56px]',
        s.header,
        isBordered ? 'border-b border-gray-200' : '',
      )}
      >
        {children}
      </div>
      }
    </>
  )
}
export default HeaderWrapper
