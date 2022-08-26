const setApp = require('./loaders/express');

const port = (process.env.PORT || 3000)

setApp.then((app)=>
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
).catch((error)=>{
  console.error(error)
  process.exit(1)
})
