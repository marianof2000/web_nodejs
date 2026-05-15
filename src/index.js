const crearApp = require('./app')
const globalConstants = require('./const/globalConstants.js') // importar el archivo de constantes globales

const init = () => {
  const app = crearApp() // crear una instancia de express configurada
  app.listen(globalConstants.PORT) // escuchar en el puerto
  console.log('La aplicacion se está ejecutando en el puerto:' + globalConstants.PORT) // mostrar en consola que se está ejecutando la aplicación en el puerto correspondiente
}

init() // iniciar la aplicación
