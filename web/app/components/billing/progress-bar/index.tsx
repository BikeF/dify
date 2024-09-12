type ProgressBarProps = {
  percent: number
  color: string
}
const ProgressBar = ({
  percent = 0,
  color = '#029156',
}: ProgressBarProps) => {
  return (
    <div className='bg-[#F2F4F7] rounded-[4px] overflow-hidden'>
      <div
        className='h-2 rounded-[4px]'
        style={{
          width: `${Math.min(percent, 100)}%`,
          backgroundColor: color,
        }}
      />
    </div>
  )
}

export default ProgressBar
