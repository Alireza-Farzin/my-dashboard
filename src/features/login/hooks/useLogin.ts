"use client"

import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { sendOTP, verifyOTP } from "@/public/mock/mockAuth"
import { useRouter } from "next/navigation"

const phoneSchema = z.string().regex(/^09[0-9]{9}$/, "شماره موبایل باید 11 رقم باشد")

export function useLogin() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)

  const router = useRouter()

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const sendMutation = useMutation({
    mutationFn: (phone: string) => sendOTP(phone),
    onSuccess: () => {
      setStep("otp")
      setTimeLeft(120)
    },
  })

  const verifyMutation = useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      verifyOTP(phone, code),
    onSuccess: (data) => {
      console.log("ورود موفق", data.token)
      
      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }
   
      router.replace("/")
    },
  })

  const handleSend = (phoneInput: string) => {
    try {
      const validated = phoneSchema.parse(phoneInput)
      setPhone(validated)
      sendMutation.mutate(validated)
    } catch (error) {
      if (error instanceof z.ZodError) {
        sendMutation.reset()
      }
    }
  }

  const handleVerify = (code: string) => {
    if (code.length !== 6) return
    verifyMutation.mutate({ phone, code })
  }

  const resend = () => {
    if (timeLeft > 0) return
    setTimeLeft(120)
    sendMutation.mutate(phone)
  }

  const changePhone = () => {
    setStep("phone")
    setPhone("")
    setTimeLeft(0)
    sendMutation.reset()
    verifyMutation.reset()
  }

  return {
    step,
    phone,
    timeLeft,
    isSending: sendMutation.isPending,
    isVerifying: verifyMutation.isPending,
    sendError: sendMutation.error,
    verifyError: verifyMutation.error,
    handleSend,
    handleVerify,
    resend,
    changePhone,
  }
}