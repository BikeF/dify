'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const Topbar = () => {
  return (
    <>
      <ProgressBar
        height='2px'
        color="#F4AA3F"
        options={{ showSpinner: false }}
        shallowRouting />
    </>)
}

export default Topbar
