"use client"
import { usePathname } from "next/navigation"
import c from './index.module.css'
import classNames from "@/utils/classnames"
import SideBar from '@/app/components/sidebar'

type ContentWrapperProps = {
  SideBar: React.ReactNode
  children: React.ReactNode
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const pathname = usePathname()
  const isBordered = ["/apps", "/datasets", "/datasets/create", "/tools"].includes(pathname)

  return (
    <div className={classNames("flex ", "bg-gray-300", c.contentLayout)}>
      <div className="m-[5px]">
        <SideBar></SideBar>
      </div>
      <div className="grow">{children}</div>
    </div>
  )
}
export default ContentWrapper
