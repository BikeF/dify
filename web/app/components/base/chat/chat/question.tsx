import type {
  FC,
  ReactNode,
} from 'react'
import {
  memo,
} from 'react'
import type { ChatItem } from '../types'
import type { Theme } from '../embedded-chatbot/theme/theme-context'
import { CssTransform } from '../embedded-chatbot/theme/utils'
import { QuestionTriangle } from '@/app/components/base/icons/src/vender/solid/general'
import { User } from '@/app/components/base/icons/src/public/avatar'
import { Markdown } from '@/app/components/base/markdown'
import ImageGallery from '@/app/components/base/image-gallery'
import { FileType } from '@/types/app'
import cn from '@/utils/classnames'
import s from '@/app/components/datasets/documents/style.module.css'

type QuestionProps = {
  item: ChatItem
  questionIcon?: ReactNode
  theme: Theme | null | undefined
}
const Question: FC<QuestionProps> = ({
  item,
  questionIcon,
  theme,
}) => {
  const {
    content,
    message_files,
  } = item

  const getExtension = (url: string) => {
    return url.split('.').pop()?.toLowerCase()
  }

  // const imgSrcs = message_files?.length ? message_files.map(item => item.url) : []
  return (
    <div className='flex justify-end mb-2 last:mb-0 pl-10'>
      <div className='group relative mr-4'>
        <QuestionTriangle
          className='absolute -right-2 top-0 w-2 h-3 text-[#D1E9FF]/50'
          style={theme ? { color: theme.chatBubbleColor } : {}}
        />
        <div
          className='px-4 py-3 bg-[#D1E9FF]/50 rounded-b-2xl rounded-tl-2xl text-sm text-gray-900'
          style={theme?.chatBubbleColorStyle ? CssTransform(theme.chatBubbleColorStyle) : {}}
        >
          {
            (message_files || []).map((item, index) => {
              if (item.type === FileType.image) {
                return <ImageGallery key={index} srcs={[item.url]} />
              }
              else {
                return <div key={index} className={cn('bg-gray-500 border-y-zinc-300 text-white py-1 px-2 mb-1 flex items-center rounded')}>
                  <div className={cn(s[`${getExtension(item.url)}Icon`], 'w-4 h-4')}></div>
                  <span className='ml-1 text-xs'>{item.url}</span>
                </div>
              }
            })
          }
          <Markdown content={content} />
        </div>
        <div className='mt-1 h-[18px]' />
      </div>
      <div className='shrink-0 w-10 h-10'>
        {
          questionIcon || (
            <div className='w-full h-full rounded-full border-[0.5px] border-black/5'>
              <User className='w-full h-full' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default memo(Question)
