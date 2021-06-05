import nodemailer from 'nodemailer';
import {crearErrorMailNoEnviado} from './errores/errorMailNoEnviado.js'

/**
 * Al trabajar con enviarConAdjunto contemplar lo siguiente:
 * 
 * html: Cuerpo del mail html.  
 * 
 * nombreDeArchivo: Nombre del archivo/imagen a adjuntar. Debe contener la extension, por ej: .img
 * 
 * url: Direccion de donde se encuentra el archivo/imagen
 * @param {string} mail - Mail desde donde queremos enviar.
 * @param {string} pass - Constraseña del mail (puede ser la contraseña para aplicaciones).
 */

function crearEnviadorDeMails(mail, pass){
  
    const remitente = 'remitente'

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: mail, 
          pass: pass, 
        },
      });

      return{
          
          enviarConTexto: async (to, subject, text) => {
            const mailOptions = {
                from: remitente,
                to: to,
                subject: subject,
                text: text
            }

            try {
               await transporter.sendMail(mailOptions)
                console.log(`mail enviado`)
            } catch (err) {
                throw crearErrorMailNoEnviado(`Error al enviar el mail. ${err}`)
            } 

          },
          enviarConHtml: async (to, subject, html) => {
            const mailOptions = {
                from: remitente,
                to: to,
                subject: subject,
                html: html
            }

            try {
                await transporter.sendMail(mailOptions)
                console.log(`mail enviado`)
            } catch (err) {
                throw crearErrorMailNoEnviado(`Error al enviar el mail. ${err}`)
            }
          },
          enviarConAdjunto: async (to, subject, html, nombreDeArchivo, url) => {
            const mailOptions = {
                from: remitente,
                to: to,
                subject: subject,
                html: html,
                attachments:[{
                    filename: `${nombreDeArchivo}`,
                    path: `${url}`
                }]
            }

            try {
               await transporter.sendMail(mailOptions)
                console.log(`mail enviado`)
            } catch (err) {
                throw crearErrorMailNoEnviado(`Error al enviar el mail. ${err}`)
            }
          }    
      }

}


export {crearEnviadorDeMails}