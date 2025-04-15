import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./emailHtmlContents";
import client from "./mailtrap";
import { sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [{ email: email }];
  try {
    const response = await client
      .send({
        from: sender,
        to: recipients,
        subject: "Verify your email address",
        html: htmlContent.replace("{verificationToken}", verificationToken),
        category: "Email Verification",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [{ email: email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const response = await client
      .send({
        from: sender,
        to: recipients,
        subject: "Welcome to our service!",
        html: htmlContent,
        category: "Welcome Email",
        template_variables: {
          company_name: "FESWEB",
          name: name,
        },
      })
      .then(console.log, console.error);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendResetPasswordEmail = async (email: string, link: string) => {
  const recipients = [{ email: email }];
  const htmlContent = generatePasswordResetEmailHtml(link);
  try {
    const response = await client
      .send({
        from: sender,
        to: recipients,
        subject: "Reset your password",
        html: htmlContent,
        category: "Password Reset",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send reset email");
  }
};

export const sendResetEmail = async (email: string, name: string) => {
  const recipients = [{ email: email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const response = await client
      .send({
        from: sender,
        to: recipients,
        subject: "Your password has been changed",
        html: htmlContent,
        category: "Password Changed",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send success email");
  }
};
