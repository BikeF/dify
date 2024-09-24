import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'
import { useLocalFileUploader } from './hooks'
import type { ImageFile } from '@/types/app'
import { ALLOW_FILE_EXTENSIONS, ALLOW_FILE_EXTENSIONS2 } from '@/types/app'

type UploaderProps = {
  children: (hovering: boolean) => JSX.Element
  onUpload: (imageFile: ImageFile) => void
  closePopover?: () => void
  limit?: number
  disabled?: boolean
  enableImg: boolean
}

const Uploader: FC<UploaderProps> = ({
  children,
  onUpload,
  closePopover,
  limit,
  disabled,
  enableImg,
}) => {
  const [hovering, setHovering] = useState(false)
  const { handleLocalFileUpload } = useLocalFileUploader({
    limit,
    onUpload,
    disabled,
    enableFile: true,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file)
      return

    handleLocalFileUpload(file)
    closePopover?.()
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children(hovering)}
      <input
        className='absolute block inset-0 opacity-0 text-[0] w-full disabled:cursor-not-allowed cursor-pointer'
        onClick={e => ((e.target as HTMLInputElement).value = '')}
        type='file'
        accept={enableImg ? [...ALLOW_FILE_EXTENSIONS, ...ALLOW_FILE_EXTENSIONS2].map(ext => `.${ext}`).join(',') : ALLOW_FILE_EXTENSIONS2.map(ext => `.${ext}`).join(',')}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Uploader
