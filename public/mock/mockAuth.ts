type MockUser = { phone: string; verified: boolean };

const mockUsers = new Map<string, MockUser>();
const mockOTPs = new Map<string, { code: string; expires: number }>();

const OTP_TIMEOUT = 120;

export async function sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
  const code = "123456"; 

  mockOTPs.set(phone, {
    code,
    expires: Date.now() + OTP_TIMEOUT * 1000,
  });

  console.log(`[MOCK SMS] به ${phone} کد ${code} ارسال شد`);

  if (!mockUsers.has(phone)) {
    mockUsers.set(phone, { phone, verified: false });
  }

  return { success: true, message: "کد ارسال شد" };
}

export async function verifyOTP(
  phone: string,
  code: string
): Promise<{ success: boolean; token?: string; message: string }> {
  const stored = mockOTPs.get(phone);

  if (!stored) {
    return { success: false, message: "کد منقضی یا ارسال نشده" };
  }

  if (Date.now() > stored.expires) {
    mockOTPs.delete(phone);
    return { success: false, message: "کد منقضی شده" };
  }

  if (stored.code !== code) {
    return { success: false, message: "کد اشتباه است" };
  }

  mockOTPs.delete(phone);
  const user = mockUsers.get(phone)!;
  user.verified = true;

  const fakeToken = `mock-jwt-${phone}-${Date.now()}`;

  return { success: true, token: fakeToken, message: "ورود موفق" };
}
