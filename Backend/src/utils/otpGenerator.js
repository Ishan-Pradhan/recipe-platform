export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
};
