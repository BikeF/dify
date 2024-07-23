import { useTranslation } from 'react-i18next'
import { Webhooks } from '@/app/components/base/icons/src/vender/line/development'

const Empty = () => {
  const { t } = useTranslation()

  return (
    <div className='mb-2 p-6 rounded-2xl bg-gray-50'>
      <div className='flex items-center justify-center mb-3 w-12 h-12 rounded-[10px] border border-[#EAECF5]'>
        <Webhooks className='w-6 h-6 text-gray-500' />
      </div>
      <div className='mb-2 text-sm text-gray-600'>{t('common.apiBasedExtension.title')}</div>
    </div>
  )
}

export default Empty
