"use client"
import { usePathname } from "next/navigation"
import c from './index.module.css'
import classNames from "@/utils/classnames"
import SideBar from '@/app/components/sidebar'

type ContentWrapperProps = {
  children: React.ReactNode
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const pathname = usePathname()
  const isBordered = ["/explore/apps", "/apps", "/datasets", "/tools"].includes(pathname)

  const isAppEdit = /\/app\/[a-z|0-9|\-]+\/[configuration|workflow|develop|logs|overview]/.test(pathname)

  return (
    <div className={classNames("flex grow overflow-y-auto overflow-x-hidden", isAppEdit ? "" : 'm-[5px]', c.contentLayout)}>
      {isBordered && <div className="mr-[5px] h-full">
        <SideBar></SideBar>
      </div>}
      <div className="grow h-full flex flex-col overflow-y-auto overflow-x-hidden">{children}</div>
    </div>
  )
}
export default ContentWrapper
