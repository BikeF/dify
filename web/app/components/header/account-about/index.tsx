'use client'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { RiCloseLine } from '@remixicon/react'
import s from './index.module.css'
import Modal from '@/app/components/base/modal'
import type { LangGeniusVersionResponse } from '@/models/common'
import LogoSite from '@/app/components/base/logo/logo-site'

type IAccountSettingProps = {
  langeniusVersionInfo: LangGeniusVersionResponse
  onCancel: () => void
}
const buttonClassName = `
shrink-0 flex items-center h-8 px-3 rounded-lg border border-gray-200
text-xs text-gray-800 font-medium
`
export default function AccountAbout({
  langeniusVersionInfo,
  onCancel,
}: IAccountSettingProps) {
  const { t } = useTranslation()
  const isLatest = langeniusVersionInfo.current_version === langeniusVersionInfo.latest_version

  return (
    <Modal isShow onClose={() => {}} className={s.modal}>
      <div className="relative pt-4">
        <div
          className="absolute -top-2 -right-4 flex justify-center items-center w-8 h-8 cursor-pointer"
          onClick={onCancel}
        >
          <RiCloseLine className="w-4 h-4 text-gray-500" />
        </div>
        <div>
          <LogoSite className="mx-auto mb-2" />
          {/* <div className='mb-3 text-center text-xs font-normal text-gray-500'>Version {langeniusVersionInfo?.current_version}</div> */}
          <div className="mb-3 text-center text-xs font-normal text-gray-500">
            Version 1.2.0
          </div>
          <div className="mb-4 text-center text-xs font-normal text-gray-700">
            <div>© {dayjs().year()} LightARK, Inc., Contributors.</div>
          </div>
        </div>
        <div className="mb-4 -mx-8 h-[0.5px] bg-gray-200" />
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium text-gray-800">
            {isLatest
              ? t('common.about.latestAvailable', { version: '1.2.0' })
              : t('common.about.nowAvailable', { version: '1.2.0' })}
          </div>
          <div className="flex items-center">
          </div>
        </div>
      </div>
    </Modal>
  )
}
