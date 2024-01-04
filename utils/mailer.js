const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, 
  secure: process.env.SMTP_SECURE === 'true',  // Convierte la cadena de entorno en booleano
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = (emailOptions) => {
  transporter.sendMail(emailOptions, function(error, info){
    if (error) {
      console.log("Error al enviar correo:", error);
    } else {
      console.log("Correo enviado exitosamente:", info.response);
    }
  });
};

module.exports = sendEmail;
