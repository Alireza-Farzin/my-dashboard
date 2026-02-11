"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, ArrowRight } from "lucide-react"

type Props = {
  phone: string
  otp: string
  onOtpChange: (otp: string) => void
  timeLeft: number
  isLoading: boolean
  error?: string
  onSubmit: (e: React.FormEvent) => void
  onResend: () => void
  onChangePhone: () => void
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export default function LoginOtpView({
  phone,
  otp,
  onOtpChange,
  timeLeft,
  isLoading,
  error,
  onSubmit,
  onResend,
  onChangePhone,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader className="space-y-4 text-center pb-8 pt-8">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              تأیید شماره موبایل
            </CardTitle>
            <CardDescription className="text-base text-gray-600 mt-2">
              کد 6 رقمی ارسال شده به{" "}
              <span className="font-bold text-gray-900 dir-ltr inline-block">{phone}</span>
              {" "}را وارد کنید
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="h-14 text-center text-2xl font-bold tracking-widest border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                placeholder="- - - - - -"
                dir="ltr"
                disabled={isLoading}
              />
              {otp && otp.length === 6 && (
                <p className="text-xs text-green-600 text-center">✓ کد کامل شد</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-green-600 hover:bg-green-700"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "در حال تأیید..." : "تأیید و ورود"}
            </Button>
          </form>

          <div className="space-y-3 pt-2">
            {timeLeft > 0 ? (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ارسال مجدد کد تا{" "}
                  <span className="font-mono font-bold text-green-600 text-base">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-11 font-medium border-2 border-green-600 text-green-600 hover:bg-green-50"
                onClick={onResend}
              >
                ارسال مجدد کد
              </Button>
            )}

            <Button
              variant="ghost"
              className="w-full h-11 font-medium text-gray-600 hover:text-gray-900"
              onClick={onChangePhone}
            >
              <ArrowRight className="ml-2 w-4 h-4" />
              تغییر شماره موبایل
            </Button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            کد پیامکی خود را دریافت نکرده‌اید؟ لطفاً پوشه هرزنامه را بررسی کنید
          </p>
        </CardContent>
      </Card>
    </div>
  )
}