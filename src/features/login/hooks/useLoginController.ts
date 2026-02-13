"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLoginService } from "./Useloginservice"
import { validateOtp, validatePhone } from "../interface/validation"

type Step = "phone" | "otp"

export function useLoginController() {
  const router = useRouter()
  const service = useLoginService()
  
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

  const handlePhoneChange = (value: string) => {
    setPhone(value)
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validatePhone(phone)
    if (!validation.isValid) {
      return
    }

    service.sendOtp(phone, {
      onSuccess: () => {
        setStep("otp")
        setTimeLeft(120)
      },
      onError: (error) => {
        console.error("Send OTP failed:", error)
      }
    })
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validation = validateOtp(otp)
    if (!validation.isValid) {
      return
    }

    service.verifyOtp(phone, otp, {
      onSuccess: (token) => {
        localStorage.setItem("authToken", token)
        router.replace("/")
      },
      onError: (error) => {
        console.error("Verify OTP failed:", error)
        console.error("Error during OTP verification:", error);
      }
    })
  }

  const handleResend = () => {
    service.sendOtp(phone, {
      onSuccess: () => {
        setTimeLeft(120)
        setOtp("")
      },
      onError: (error) => {
        console.error("Resend OTP failed:", error)
      }
    })
  }

  const handleChangePhone = () => {
    setStep("phone")
    setOtp("")
    setTimeLeft(120)
    service.reset()
  }

  return {
    step,
    phone,
    otp,
    timeLeft,
    isLoading: service.isSending || service.isVerifying,
    error: service.sendError || service.verifyError,
    handlePhoneChange,
    handleOtpChange,
    handlePhoneSubmit,
    handleOtpSubmit,
    handleResend,
    handleChangePhone,
  }
}