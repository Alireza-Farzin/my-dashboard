"use client"

import { useState } from "react"
import { sendOTP, verifyOTP } from "@/public/mock/mockAuth"

type Callbacks = {
  onSuccess: (data?: any) => void
  onError: (error: string) => void
}

export function useLoginService() {
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [sendError, setSendError] = useState<string>()
  const [verifyError, setVerifyError] = useState<string>()

  const sendOtp = async (phone: string, callbacks: Callbacks) => {
    setIsSending(true)
    setSendError(undefined)

    try {
      const result = await sendOTP(phone)
      
      if (result.success) {
        callbacks.onSuccess()
      } else {
        const errorMsg = result.message || "خطا در ارسال کد"
        setSendError(errorMsg)
        callbacks.onError(errorMsg)
      }
    } catch (error) {
      const errorMsg = "خطا در ارتباط با سرور"
      setSendError(errorMsg)
      callbacks.onError(errorMsg)
    } finally {
      setIsSending(false)
    }
  }

  const verifyOtp = async (phone: string, code: string, callbacks: Callbacks) => {
    setIsVerifying(true)
    setVerifyError(undefined)

    try {
      const result = await verifyOTP(phone, code)
      
      if (result.success && result.token) {
        callbacks.onSuccess(result.token)
      } else {
        const errorMsg = result.message || "کد تأیید اشتباه است"
        setVerifyError(errorMsg)
        callbacks.onError(errorMsg)
      }
    } catch (error) {
      const errorMsg = "خطا در ارتباط با سرور"
      setVerifyError(errorMsg)
      callbacks.onError(errorMsg)
    } finally {
      setIsVerifying(false)
    }
  }

  const reset = () => {
    setSendError(undefined)
    setVerifyError(undefined)
  }

  return {
    isSending,
    isVerifying,
    sendError,
    verifyError,
    sendOtp,
    verifyOtp,
    reset,
  }
}