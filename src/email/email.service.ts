import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // O usa otro proveedor
      auth: {
        user: process.env.EMAIL_USER, // Configura tu correo
        pass: process.env.EMAIL_PASSWORD, // Configura tu contraseña
      },
    });
  }

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Restablecimiento de contraseña',
      html: `
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
