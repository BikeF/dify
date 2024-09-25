import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/app/components/base/button'
import type { ImageFile } from '@/types/app'
import { ALLOW_FILE_EXTENSIONS, EXCEL_FILE_EXTENSIONS, FileType, PDF_FILE_EXTENSIONS, TransferMethod } from '@/types/app'

type ImageLinkInputProps = {
  onUpload: (imageFile: ImageFile) => void
  disabled?: boolean
}
const regex = /^(https?|ftp):\/\//
const ImageLinkInput: FC<ImageLinkInputProps> = ({
  onUpload,
  disabled,
}) => {
  const { t } = useTranslation()
  const [imageLink, setImageLink] = useState('')

  const handleClick = () => {
    if (disabled)
      return

    function getFileType(url: string) {
      const extension = url.split('.').pop()?.toLowerCase()
      if (extension) {
        if (PDF_FILE_EXTENSIONS.includes(extension))
          return FileType.pdf
        else if (EXCEL_FILE_EXTENSIONS.includes(extension))
          return FileType.excel
        else if (ALLOW_FILE_EXTENSIONS.includes(extension))
          return FileType.image
      }

      return FileType.unknown
    }

    const imageFile = {
      type: TransferMethod.remote_url,
      _id: `${Date.now()}`,
      fileId: '',
      fileType: getFileType(imageLink),
      progress: regex.test(imageLink) ? 0 : -1,
      url: imageLink,
    }

    onUpload(imageFile)
  }

  return (
    <div className='flex items-center pl-1.5 pr-1 h-8 border border-gray-200 bg-white shadow-xs rounded-lg'>
      <input
        type="text"
        className='grow mr-0.5 px-1 h-[18px] text-[13px] outline-none appearance-none'
        value={imageLink}
        onChange={e => setImageLink(e.target.value)}
        placeholder={t('common.imageUploader.pasteImageLinkInputPlaceholder') || ''}
      />
      <Button
        variant='primary'
        size='small'
        disabled={!imageLink || disabled}
        onClick={handleClick}
      >
        {t('common.operation.ok')}
      </Button>
    </div>
  )
}

export default ImageLinkInput
