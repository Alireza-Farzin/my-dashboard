"use client"
import { Button } from '@/components/ui/button'
const index = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 text-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-xl font-medium text-gray-700">
          متاسفانه صفحه مورد نظر پیدا نشد.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ممکن است آدرس اشتباه وارد شده باشد یا صفحه مورد نظر حذف شده باشد.
        </p>
        <Button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  )
}

export default index
