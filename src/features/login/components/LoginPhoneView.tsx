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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader className="space-y-4 text-center pb-8 pt-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              ورود به سیستم
            </CardTitle>
            <CardDescription className="text-base text-gray-600 mt-2">
              لطفاً شماره موبایل خود را وارد کنید
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pb-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block text-right">
                شماره موبایل
              </label>
              <Input
                placeholder="09123456789"
                dir="ltr"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, "").slice(0, 11))}
                className="h-12 text-lg text-center text-black font-medium border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              {phone && phone.length === 11 && (
                <p className="text-xs text-green-600 text-center">✓ شماره معتبر است</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || phone.length !== 11}
            >
              {isLoading ? "در حال ارسال کد..." : "دریافت کد تأیید"}
            </Button>

            <p className="text-center text-xs text-gray-500 mt-4">
              با ورود به سیستم، <span className="text-blue-600 font-medium">قوانین و مقررات</span> را می‌پذیرید
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}