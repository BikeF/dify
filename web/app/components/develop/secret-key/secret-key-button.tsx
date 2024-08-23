'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/app/components/base/button'
import SecretKeyModal from '@/app/components/develop/secret-key/secret-key-modal'
// import { KeyIcon } from '@heroicons/react/20/solid'

type ISecretKeyButtonProps = {
  className?: string
  appId?: string
  iconCls?: string
  textCls?: string
}

const SecretKeyButton = ({ className, appId, iconCls, textCls }: ISecretKeyButtonProps) => {
  const [isVisible, setVisible] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button className={`px-3 ${className}`} onClick={() => setVisible(true)}>
        <div className={'flex items-center justify-center w-4 h-4 mr-2'}>
          <svg width="14" height="14" viewBox="0 0 25 24" version="1.1" xmlns="http://www.w3.org/2000/svg" className={iconCls}>
            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="工作流-数据" transform="translate(-866.000000, -383.000000)" fill="currentColor" fill-rule="nonzero">
                <g id="编组-8" transform="translate(852.000000, 373.000000)">
                  <g id="icon/line/预览备份-4" transform="translate(14.748656, 10.000000)">
                    <g id="a-miyuemima" transform="translate(2.000000, 2.000000)">
                      <path d="M6.05884208,9.6138464 C4.51268792,9.6138464 3.08398255,10.4387098 2.31090546,11.7777185 C1.53782838,13.1167273 1.53782838,14.7664542 2.31090546,16.1054629 C3.08398255,17.4444717 4.51268792,18.2693351 6.05884208,18.2693351 C8.44898928,18.2693351 10.3865864,16.3317379 10.3865864,13.9415907 C10.3865864,11.5514435 8.44898928,9.6138464 6.05884208,9.6138464 L6.05884208,9.6138464 Z M0,13.9415907 C-0.000125257634,11.7768914 1.15465612,9.77657322 3.02931983,8.69418741 C4.90398353,7.61180161 7.21370062,7.61180161 9.08836432,8.69418741 C10.963028,9.77657322 12.1178094,11.7768914 12.1176841,13.9415907 C12.1174905,17.2876599 9.40491124,20.0000822 6.05884207,20.0000822 C2.7127729,20.0000822 0.000193616133,17.2876599 0,13.9415907 L0,13.9415907 Z" id="形状"></path>
                      <path d="M19.7466319,1.47768703 L10.3926453,10.8316737 C10.0530221,11.1596925 9.51317428,11.1550014 9.17930286,10.82113 C8.84543143,10.4872585 8.84074026,9.94741066 9.16875916,9.60778755 L18.5218802,0.253800946 C18.7405064,0.0350201198 19.0592435,-0.0505060123 19.3580264,0.0294394175 C19.6568092,0.109384847 19.8902456,0.342656226 19.9704022,0.641382477 C20.0505588,0.940108728 19.9652581,1.25890623 19.7466319,1.47768703 Z" id="路径"></path>
                      <path d="M14.1023877,4.674159 C14.4403844,4.33626436 14.9882771,4.33626436 15.3262738,4.674159 L17.162103,6.50998815 C17.3871081,6.72730536 17.4773468,7.04911942 17.3981358,7.35174081 C17.3189247,7.6543622 17.0825909,7.89069598 16.7799695,7.96990706 C16.4773481,8.04911814 16.1555341,7.95887943 15.9382169,7.73387426 L14.1023877,5.89804511 C13.7644931,5.5600484 13.7644931,5.01215571 14.1023877,4.674159 L14.1023877,4.674159 Z" id="路径"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className={`text-[13px] text-gray-800 ${textCls}`}>{t('appApi.apiKey')}</div>
      </Button>
      <SecretKeyModal isShow={isVisible} onClose={() => setVisible(false)} appId={appId} />
    </>
  )
}

export default SecretKeyButton
