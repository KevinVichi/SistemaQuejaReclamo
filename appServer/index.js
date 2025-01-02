const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());

//Manejo de rutas
const agencyRoute = require("./routes/agencyRoute");
app.use("/agencies", agencyRoute);

//manejo clientes
const clientRoute = require("./routes/clientRoute");
app.use("/clients", clientRoute);

//manejo canales
const channelRoute = require("./routes/channelRoute");
app.use("/channels", channelRoute);

//manejo empleados
const employeeRoute = require("./routes/employeeRoute");
app.use("/employees", employeeRoute);

//manejo qr
const qrRoute = require("./routes/qrRoute");
app.use("/qr", qrRoute);

//manejo qr
const followRoute = require("./routes/followRoute");
app.use("/follows", followRoute);

//levantar servidor
app.listen(port, () => {
  console.log("Servidor se esta ejecutando");
});
