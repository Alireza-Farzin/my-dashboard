"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

type Props = {
  phone: string
  onPhoneChange: (phone: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  error?: string
}

export default function LoginPhoneView({
  phone,
  onPhoneChange,
  onSubmit,
  isLoading,
  error
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl border border-[#fcfcfc14] bg-[#171717]">
        <CardHeader className="space-y-6 text-center pb-8 pt-10">
          <div className="mx-auto w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
            <Phone className="w-10 h-10 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">
              ورود به سیستم
            </CardTitle>
            <CardDescription className="text-base mt-3">
              لطفاً شماره موبایل خود را وارد کنید
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-8 px-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium block text-right">
                شماره موبایل
              </label>
              <div className="relative">
                <Input
                  placeholder="09123456789"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  className="h-14 text-lg text-center font-medium border-[#fcfcfc14] bg-background focus:border-primary/50 transition-colors"
                  disabled={isLoading}
                />
                {phone && phone.length === 11 && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                  </div>
                )}
              </div>
              {phone && phone.length === 11 && (
                <p className="text-xs text-primary text-center flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  شماره معتبر است
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
              disabled={isLoading || phone.length !== 11}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال ارسال کد...
                </span>
              ) : (
                "دریافت کد تأیید"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
              با ورود به سیستم، <span className="font-medium underline decoration-dotted cursor-pointer hover:text-foreground transition-colors">قوانین و مقررات</span> را می‌پذیرید
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}