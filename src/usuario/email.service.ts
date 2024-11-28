import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Configuración del transportador (puedes usar tu propio servidor SMTP o un servicio como Gmail, SendGrid, etc.)
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // o el servicio que estés usando
      auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña', // Si usas Gmail, puede que necesites configurar una contraseña de aplicación
      },
    });
  }

  // Método para enviar el correo con un código de validación
  async sendValidationCode(email: string, code: string): Promise<void> {
    const mailOptions = {
      from: 'tu_correo@gmail.com',
      to: email,
      subject: 'Código de Validación',
      text: `Tu código de validación es: ${code}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
}
