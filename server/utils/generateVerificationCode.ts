export const generateVerificationCode = (length: number): string => {
  const characters = "0123456789";
  let verificationCode = "";
  const codeLength = characters.length;

  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(
      Math.floor(Math.random() * codeLength)
    );
  }
  return verificationCode;
};
