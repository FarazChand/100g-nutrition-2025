import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailVerification(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const confirmUrl = `${baseUrl}/verify-email?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Verify your email address",
      html: `
        <h2>Confirm your email</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${confirmUrl}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    console.log("Verification email sent:", data);
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
}
