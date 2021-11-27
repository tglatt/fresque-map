import { getSmtpConfig } from '$lib/config/variables';
import nodemailer from 'nodemailer';

const { SMTP_FROM, SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } = getSmtpConfig();

const smtpConfig = {
	host: SMTP_HOST,
	ignoreTLS: false,
	port: SMTP_PORT,
	requireTLS: true,
	secure: false,
	auth: {
		pass: SMTP_PASS,
		user: SMTP_USER,
	},
};

export function sendEmail({ to, subject, text, html, bcc }) {
	const transporter = nodemailer.createTransport(smtpConfig);
	const mailOptions = {
		bcc,
		from: SMTP_FROM,
		html,
		subject,
		text,
		to,
	};
	return transporter.sendMail(mailOptions);
}
