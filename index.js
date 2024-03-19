import express from "express";
import bodyParser from "body-parser";

import employeesRoutes from "./src/routes/employees.js";
import authenticationRouters from "./src/routes/authentication.js";
import userRouters from "./src/routes/user.js";
import session from "express-session";

const app = express();
const PORT = 5000;

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json());

app.use("/employees", employeesRoutes);
app.use("/authentication", authenticationRouters);
app.use("/users", userRouters);
app.get("/", (req, res) => res.send("Welcome to the Employees API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
