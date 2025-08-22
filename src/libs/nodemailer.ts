import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createUserInput } from "../services/users";

dotenv.config();

interface sendEmailInput {
    from: string;
    to: string;
    subject: string;
    text: string;
}

const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

export async function sendEmail(
    name: string,
    email: string,
    eventName: string,
    eventDate: string,
    eventLocal: string
) {
    const mailOptions: sendEmailInput = {
        from: process.env.NODEMAILER_EMAIL as string,
        to: email,
        subject: "Você foi registrado em um evento!",
        text: `Olá ${name},\n\n Você foi registrado no evento de ${eventName} com sucesso! Será as ${eventDate} no local ${eventLocal}.\n\nObrigado por participar!`,
    };

    try {
        const sendMail = await transport.sendMail(mailOptions);
        return sendEmail;
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
