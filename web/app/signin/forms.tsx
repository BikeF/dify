'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import NormalForm from './normalForm'
import OneMoreStep from './oneMoreStep'
import cn from '@/utils/classnames'

const Forms = () => {
  const searchParams = useSearchParams()
  const step = searchParams.get('step')
  const { t } = useTranslation()

  const getForm = () => {
    switch (step) {
      case 'next':
        return <OneMoreStep />
      default:
        return <NormalForm />
    }
  }
  return (
    <div className={cn('flex justify-between h-[575px] p-6')}>
      <div className={cn('grow', 'md:flex hidden flex-col justify-between mr-[130px]')}>
        <div className="w-full mx-auto">
          <h2 className="text-[34px] font-bold text-gray-900 mb-3">
            {t('login.pageTitle')}
          </h2>
          <p className="mt-1 text-md text-gray-600">{t('login.welcome')}</p>
        </div>
        <div className={cn('w-full text-right')}>
          <img
            src={'/images/login-left.png'}
            className="w-[552px] inline-block"
            alt=""
          ></img>
        </div>
      </div>
      <div
        className={cn(
          'mx-auto flex flex-col items-center justify-center w-[500px]',
        )}
      >
        <div className="flex flex-col h-full w-full">{getForm()}</div>
      </div>
    </div>
  )
}

export default Forms
