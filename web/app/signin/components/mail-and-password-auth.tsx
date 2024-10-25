import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'use-context-selector'
import Button from '@/app/components/base/button'
import Toast from '@/app/components/base/toast'
import { emailRegex } from '@/config'
import { login } from '@/service/common'
import Input from '@/app/components/base/input'
import I18NContext from '@/context/i18n'
import classNames from 'classnames'
import style from './mail-and-password-auth.module.css'

type MailAndPasswordAuthProps = {
  isInvite: boolean
  allowRegistration: boolean
}

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

export default function MailAndPasswordAuth({ isInvite, allowRegistration }: MailAndPasswordAuthProps) {
  const { t } = useTranslation()
  const { locale } = useContext(I18NContext)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const emailFromLink = decodeURIComponent(searchParams.get('email') || '')
  const [email, setEmail] = useState(emailFromLink)
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const handleEmailPasswordLogin = async () => {
    if (!email) {
      Toast.notify({ type: 'error', message: t('login.error.emailEmpty') })
      return
    }
    if (!emailRegex.test(email)) {
      Toast.notify({
        type: 'error',
        message: t('login.error.emailInValid'),
      })
      return
    }
    if (!password?.trim()) {
      Toast.notify({ type: 'error', message: t('login.error.passwordEmpty') })
      return
    }
    if (!passwordRegex.test(password)) {
      Toast.notify({
        type: 'error',
        message: t('login.error.passwordInvalid'),
      })
      return
    }
    try {
      setIsLoading(true)
      const loginData: Record<string, any> = {
        email,
        password,
        language: locale,
        remember_me: true,
      }
      if (isInvite)
        loginData.invite_token = decodeURIComponent(searchParams.get('invite_token') as string)
      const res = await login({
        url: '/login',
        body: loginData,
      })
      if (res.result === 'success') {
        if (isInvite) {
          router.replace(`/signin/invite-settings?${searchParams.toString()}`)
        }
        else {
          localStorage.setItem('console_token', res.data.access_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          router.replace('/apps')
        }
      }
      else if (res.code === 'account_not_found') {
        if (allowRegistration) {
          const params = new URLSearchParams()
          params.append('email', encodeURIComponent(email))
          params.append('token', encodeURIComponent(res.data))
          router.replace(`/reset-password/check-code?${params.toString()}`)
        }
        else {
          Toast.notify({
            type: 'error',
            message: t('login.error.registrationNotAllowed'),
          })
        }
      }
      else {
        Toast.notify({
          type: 'error',
          message: res.data,
        })
      }
    }

    finally {
      setIsLoading(false)
    }
  }
  return <>
    <h1 className="text-2xl font-bold text-gray-900 mb-[40px]">账号登录</h1>

    <form onSubmit={() => { }}>
      <div className="mb-8">
        {/* <label
                    htmlFor="email"
                    className="my-2 block text-sm font-medium text-gray-900"
                  >
                    {t('login.email')}
                  </label> */}
        <div className="relative mt-1">
          <div className={classNames(style.emailIcon, "")}></div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("login.emailPlaceholder") || ""}
            className={
              "appearance-none block w-full rounded pl-8 py-3 bg-primary-50 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm pr-10"
            }
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="relative mt-3">
          <div className={classNames(style.passwordIcon, "")}></div>
          <input
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                handleEmailPasswordLogin()
            }}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder={t("login.passwordPlaceholder") || ""}
            className={
              "appearance-none block w-full rounded pl-8 py-3 bg-primary-50 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm pr-10"
            }
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
            >
              {showPassword ? "👀" : "😝"}
            </button>
          </div>
        </div>
        <label
          htmlFor="password"
          className="my-3 flex items-center justify-end text-sm font-medium text-gray-900"
        >
          <Link href="/forgot-password" className="text-primary-600">
            {t("login.forget")}
          </Link>
        </label>
      </div>

      <div className="mb-2">
        <Button
          tabIndex={0}
          size="big"
          variant="primary-linear"
          onClick={handleEmailPasswordLogin}
          disabled={isLoading}
          className="w-full"
        >
          {t("login.signBtn")}
        </Button>
      </div>
    </form>
  </>
  return <form onSubmit={() => { }}>
    <div className='mb-3'>
      <label htmlFor="email" className="my-2 system-md-semibold text-text-secondary">
        {t('login.email')}
      </label>
      <div className="mt-1">
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isInvite}
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t('login.emailPlaceholder') || ''}
          tabIndex={1}
        />
      </div>
    </div>

    <div className='mb-3'>
      <label htmlFor="password" className="my-2 flex items-center justify-between">
        <span className='system-md-semibold text-text-secondary'>{t('login.password')}</span>
        <Link href={`/reset-password?${searchParams.toString()}`} className='system-xs-regular text-components-button-secondary-accent-text'>
          {t('login.forget')}
        </Link>
      </label>
      <div className="relative mt-1">
        <Input
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              handleEmailPasswordLogin()
          }}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder={t('login.passwordPlaceholder') || ''}
          tabIndex={2}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            type="button"
            variant='ghost'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👀' : '😝'}
          </Button>
        </div>
      </div>
    </div>

    <div className='mb-2'>
      <Button
        tabIndex={2}
        variant='primary'
        onClick={handleEmailPasswordLogin}
        disabled={isLoading || !email || !password}
        className="w-full"
      >{t('login.signBtn')}</Button>
    </div>
  </form>
}
