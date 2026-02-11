"use client"

import LoginOtpView from "../components/LoginOtpView"
import LoginPhoneView from "../components/LoginPhoneView"
import { useLoginController } from "../hooks/useLoginController"


export default function LoginPage() {
  const controller = useLoginController()

  if (controller.step === "phone") {
    return (
      <LoginPhoneView
        phone={controller.phone}
        onPhoneChange={controller.handlePhoneChange}
        onSubmit={controller.handlePhoneSubmit}
        isLoading={controller.isLoading}
        error={controller.error}
      />
    )
  }

  return (
    <LoginOtpView
      phone={controller.phone}
      otp={controller.otp}
      onOtpChange={controller.handleOtpChange}
      timeLeft={controller.timeLeft}
      isLoading={controller.isLoading}
      error={controller.error}
      onSubmit={controller.handleOtpSubmit}
      onResend={controller.handleResend}
      onChangePhone={controller.handleChangePhone}
    />
  )
}