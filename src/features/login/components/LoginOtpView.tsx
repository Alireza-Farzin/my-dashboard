"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, ArrowRight, RefreshCw } from "lucide-react"

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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl border border-[#fcfcfc14] bg-[#171717]">
        <CardHeader className="space-y-6 text-center pb-8 pt-10">
          <div className="mx-auto w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">
              تأیید شماره موبایل
            </CardTitle>
            <CardDescription className="text-base mt-3 leading-relaxed">
              کد 6 رقمی ارسال شده به{" "}
              <span className="font-bold text-foreground dir-ltr inline-block">
                {phone}
              </span>
              {" "}را وارد کنید
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8 px-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-16 text-center text-3xl font-bold tracking-[1rem] border-[#fcfcfc14] bg-background focus:border-primary/50 transition-colors placeholder:tracking-[0.5rem]"
                  placeholder="------"
                  dir="ltr"
                  disabled={isLoading}
                />
                {otp && otp.length === 6 && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary">✓</span>
                    </div>
                  </div>
                )}
              </div>
              {otp && otp.length === 6 && (
                <p className="text-xs text-primary text-center flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  کد کامل شد
                </p>
              )}
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                <p className="text-destructive text-sm text-center font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال تأیید...
                </span>
              ) : (
                "تأیید و ورود"
              )}
            </Button>
          </form>

          <div className="space-y-3 pt-2">
            {timeLeft > 0 ? (
              <div className="text-center bg-card/50 border border-[#fcfcfc14] rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  ارسال مجدد کد تا{" "}
                  <span className="font-mono font-bold text-primary text-lg inline-block min-w-[3.5rem]">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-12 font-medium border-[#fcfcfc14] hover:bg-primary/10 hover:border-primary/30 transition-colors"
                onClick={onResend}
              >
                <RefreshCw className="ml-2 w-4 h-4" />
                ارسال مجدد کد
              </Button>
            )}

            <Button
              variant="ghost"
              className="w-full h-12 font-medium"
              onClick={onChangePhone}
            >
              <ArrowRight className="ml-2 w-4 h-4" />
              تغییر شماره موبایل
            </Button>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mt-4">
            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              کد پیامکی خود را دریافت نکرده‌اید؟ لطفاً پوشه هرزنامه را بررسی کنید
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}