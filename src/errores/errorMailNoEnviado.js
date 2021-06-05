function crearErrorMailNoEnviado(message) {
    const error = new Error(message)
    error.type = 'ERROR_MAIL_NO_ENVIADO'
    return error
  }
  
  export { crearErrorMailNoEnviado }