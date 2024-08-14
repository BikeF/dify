'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const Topbar = () => {
  return (
    <>
      <ProgressBar
        height='2px'
        color="#029156"
        options={{ showSpinner: false }}
        shallowRouting />
    </>)
}

export default Topbar
