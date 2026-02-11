export type ValidationResult = {
  isValid: boolean
  error?: string
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return {
      isValid: false,
      error: "شماره موبایل الزامی است"
    }
  }

  if (!/^09[0-9]{9}$/.test(phone)) {
    return {
      isValid: false,
      error: "شماره موبایل باید 11 رقم و با 09 شروع شود"
    }
  }

  return {
    isValid: true
  }
}

export function validateOtp(otp: string): ValidationResult {
  if (!otp) {
    return {
      isValid: false,
      error: "کد تأیید الزامی است"
    }
  }

  if (!/^[0-9]{6}$/.test(otp)) {
    return {
      isValid: false,
      error: "کد تأیید باید 6 رقم باشد"
    }
  }

  return {
    isValid: true
  }
}