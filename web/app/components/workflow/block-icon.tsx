import type { FC } from 'react'
import { memo } from 'react'
import { BlockEnum } from './types'
import {
  Answer,
  Code,
  End,
  Home,
  Http,
  IfElse,
  Iteration,
  KnowledgeRetrieval,
  Llm,
  ParameterExtractor,
  QuestionClassifier,
  TemplatingTransform,
  VariableX,
} from '@/app/components/base/icons/src/vender/workflow'
import AppIcon from '@/app/components/base/app-icon'

type BlockIconProps = {
  type: BlockEnum
  size?: string
  className?: string
  toolIcon?: string | { content: string; background: string }
}
const ICON_CONTAINER_CLASSNAME_SIZE_MAP: Record<string, string> = {
  xs: 'w-4 h-4 rounded-[5px] shadow-xs',
  sm: 'w-5 h-5 rounded-md shadow-xs',
  md: 'w-6 h-6 rounded-lg shadow-md',
}
const getIcon = (type: BlockEnum, className: string) => {
  return {
    [BlockEnum.Start]: <Home className={className} />,
    [BlockEnum.LLM]: <Llm className={className} />,
    [BlockEnum.Code]: <Code className={className} />,
    [BlockEnum.End]: <End className={className} />,
    [BlockEnum.IfElse]: <IfElse className={className} />,
    [BlockEnum.HttpRequest]: <Http className={className} />,
    [BlockEnum.Answer]: <Answer className={className} />,
    [BlockEnum.KnowledgeRetrieval]: <KnowledgeRetrieval className={className} />,
    [BlockEnum.QuestionClassifier]: <QuestionClassifier className={className} />,
    [BlockEnum.TemplateTransform]: <TemplatingTransform className={className} />,
    [BlockEnum.VariableAssigner]: <VariableX className={className} />,
    [BlockEnum.VariableAggregator]: <VariableX className={className} />,
    [BlockEnum.Tool]: <VariableX className={className} />,
    [BlockEnum.Iteration]: <Iteration className={className} />,
    [BlockEnum.ParameterExtractor]: <ParameterExtractor className={className} />,
  }[type]
}
const ICON_CONTAINER_BG_COLOR_MAP: Record<string, string> = {
  [BlockEnum.Start]: "text-primary-500 ",
  [BlockEnum.LLM]: "text-[#F79009] bg-[#FEF4E6]",
  [BlockEnum.Code]: "text-[#F79009] bg-[#FEF4E6]",
  [BlockEnum.End]: "text-[#6172F3] bg-[#EEEFFB]",
  [BlockEnum.IfElse]: "text-[#06AED4] bg-[#EEF3FD]",
  [BlockEnum.Iteration]: "text-[#06AED4] bg-[#EEF3FD]",
  [BlockEnum.HttpRequest]: "text-[#875BF7] bg-[#EEEFFB]",
  [BlockEnum.Answer]: "text-[#F79009] bg-[#FEF4E6]",
  [BlockEnum.KnowledgeRetrieval]: "text-[#16B364] bg-[#E7F7EF]",
  [BlockEnum.QuestionClassifier]: "text-[#16B364] bg-[#E7F7EF]",
  [BlockEnum.TemplateTransform]: "text-[#F79009] bg-[#FEF4E6]",
  [BlockEnum.VariableAssigner]: "text-[#F79009] bg-[#FEF4E6]",
  [BlockEnum.VariableAggregator]: "text-[#F79009] bg-[#FEF4E6]",
  [BlockEnum.ParameterExtractor]: "text-[#F79009] bg-[#FEF4E6]",
}
const BlockIcon: FC<BlockIconProps> = ({
  type,
  size = 'sm',
  className,
  toolIcon,
}) => {
  return (
    <div
      className={`
      flex items-center justify-center border-[0.5px] border-white/2
      ${ICON_CONTAINER_CLASSNAME_SIZE_MAP[size]}
      ${ICON_CONTAINER_BG_COLOR_MAP[type]}
      ${toolIcon && "!shadow-none"}
      ${className}
    `}
    >
      {type !== BlockEnum.Tool
        && getIcon(type, size === "xs" ? "w-3 h-3" : "w-3.5 h-3.5")}
      {type === BlockEnum.Tool && toolIcon && (
        <>
          {typeof toolIcon === "string"
            ? (
              <div
                className="shrink-0 w-full h-full bg-cover bg-center rounded-md"
                style={{
                  backgroundImage: `url(${toolIcon})`,
                }}
              ></div>
            )
            : (
              <AppIcon
                className="shrink-0 !w-full !h-full"
                size="tiny"
                icon={toolIcon?.content}
                background={toolIcon?.background}
              />
            )}
        </>
      )}
    </div>
  )
}

export const VarBlockIcon: FC<BlockIconProps> = ({
  type,
  className,
}) => {
  return (
    <>
      {getIcon(type, `w-3 h-3 ${className}`)}
    </>
  )
}

export default memo(BlockIcon)
