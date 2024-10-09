import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  RiCloseLine,
  RiLoader2Line,
} from '@remixicon/react'
import cn from '@/utils/classnames'
import { RefreshCcw01 } from '@/app/components/base/icons/src/vender/line/arrows'
import { AlertTriangle } from '@/app/components/base/icons/src/vender/solid/alertsAndFeedback'
import Tooltip from '@/app/components/base/tooltip'
import type { ImageFile } from '@/types/app'
import { FileType, TransferMethod } from '@/types/app'
import ImagePreview from '@/app/components/base/image-uploader/image-preview'
import s from '@/app/components/datasets/documents/style.module.css'

type ImageListProps = {
  list: ImageFile[]
  readonly?: boolean
  onRemove?: (imageFileId: string) => void
  onReUpload?: (imageFileId: string) => void
  onImageLinkLoadSuccess?: (imageFileId: string) => void
  onImageLinkLoadError?: (imageFileId: string) => void
}

const ImageList: FC<ImageListProps> = ({
  list,
  readonly,
  onRemove,
  onReUpload,
  onImageLinkLoadSuccess,
  onImageLinkLoadError,
}) => {
  const { t } = useTranslation()
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  const handleImageLinkLoadSuccess = (item: ImageFile) => {
    if (
      item.type === TransferMethod.remote_url
      && onImageLinkLoadSuccess
      && item.progress !== -1
    )
      onImageLinkLoadSuccess(item._id)
  }
  const handleImageLinkLoadError = (item: ImageFile) => {
    if (item.type === TransferMethod.remote_url && onImageLinkLoadError)
      onImageLinkLoadError(item._id)
  }
  const getExtension = (item: ImageFile) => {
    let result: string | undefined

    if (item.file)
      result = item.file.name.split('.').pop()?.toLowerCase()
    else if (item.url && item.url.split('/').pop()?.indexOf('.') !== -1)
      result = item.url.split('.').pop()?.toLowerCase()

    return result || 'unknown'
  }
  return (
    <div className="flex flex-wrap items-center">
      {list.map(item => (
        <div
          key={item._id}
          className="group relative mr-1 border-[0.5px] border-black/5 rounded-lg"
        >
          {item.type === TransferMethod.local_file && item.progress !== 100 && (
            <>
              <div
                className="absolute inset-0 flex items-center justify-center z-[1] bg-black/30"
                style={{ left: item.progress > -1 ? `${item.progress}%` : 0 }}
              >
                {item.progress === -1 && (
                  <RefreshCcw01
                    className="w-5 h-5 text-white"
                    onClick={() => onReUpload && onReUpload(item._id)}
                  />
                )}
              </div>
              {item.progress > -1 && (
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm text-white mix-blend-lighten z-[1]">
                  {item.progress}%
                </span>
              )}
            </>
          )}
          {item.type === TransferMethod.remote_url && item.progress !== 100 && (
            <div
              className={`
                  absolute inset-0 flex items-center justify-center rounded-lg z-[1] border
                  ${item.progress === -1
              ? 'bg-[#FEF0C7] border-[#DC6803]'
              : 'bg-black/[0.16] border-transparent'
            }
                `}
            >
              {item.progress > -1 && (
                <RiLoader2Line className="animate-spin w-5 h-5 text-white" />
              )}
              {item.progress === -1 && (
                <Tooltip
                  popupContent={t('common.imageUploader.pasteImageLinkInvalid')}
                >
                  <AlertTriangle className="w-4 h-4 text-[#DC6803]" />
                </Tooltip>
              )}
            </div>
          )}
          {item.fileType === FileType.image && <div className='relative w-16 h-16 rounded-lg border-[0.5px] border-black/5 overflow-hidden'>
            {/* 上传图片 */}
            <img
              className="w-full h-full object-cover cursor-pointer "
              alt={item.file?.name}
              onLoad={() => handleImageLinkLoadSuccess(item)}
              onError={() => handleImageLinkLoadError(item)}
              src={
                item.type === TransferMethod.remote_url
                  ? item.url
                  : item.base64Url
              }
              onClick={() =>
                item.progress === 100
                && setImagePreviewUrl(
                  (item.type === TransferMethod.remote_url
                    ? item.url
                    : item.base64Url) as string,
                )
              }
            />
          </div>}
          {/* 上传文件 */}
          {item.fileType !== FileType.image && <div className={cn('absoluteleft-4 top-4 bg-gray-500 border-y-zinc-300 text-white py-1 px-2 flex items-center rounded')}>
            <div className={cn(s[`${getExtension(item)}Icon`], 'w-4 h-4')}></div>
            <span className='ml-1 text-xs'>{item.file?.name}</span>
          </div>}

          {!readonly && (
            <button
              type="button"
              className={cn(
                'absolute z-10 -top-[9px] -right-[9px] items-center justify-center w-[18px] h-[18px]',
                'bg-white hover:bg-gray-50 border-[0.5px] border-black/2 rounded-2xl shadow-lg',
                item.progress === -1 ? 'flex' : 'hidden group-hover:flex',
              )}
              onClick={() => onRemove && onRemove(item._id)}
            >
              <RiCloseLine className="w-3 h-3 text-gray-500" />
            </button>
          )}
        </div>
      ))}
      {imagePreviewUrl && (
        <ImagePreview
          url={imagePreviewUrl}
          title=''
          onCancel={() => setImagePreviewUrl('')}
        />
      )}
    </div>
  )
}

export default ImageList
