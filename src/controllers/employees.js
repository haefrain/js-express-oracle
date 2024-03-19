import oracledb from "oracledb";
import {
    executeProcedureStoredCursor,
    executeRawQuery,
    executeProcedureStored,
} from '../utils/database.js'


let employees = [];

export const getEmployees = async (req, res) => {
    const employees = await executeProcedureStoredCursor('obtener_todos_los_empleados')
    console.log(`Employees in the database: ${employees.length}`);
    res.send(employees);
}

export const createEmployee = async (req, res) => {
    const employee = req.body;
    let result = {
        p_firstname: employee.firstname,
        p_lastname: employee.lastname,
        p_birthdate: employee.birthdate,
        p_gender: employee.gender,
    }
    const createdEmployee = await executeProcedureStored(result, 'insertar_empleado')
    console.log(`Employee [${employee.firstname}] added to the database.`);
    res.send(employee, 201);
};

export const getEmployee = async (req, res) => {
    const id = req.param('id')

    let result = {
        p_id: parseInt(id),
        o_firstname: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },
        o_lastname: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR },
        o_birthdate: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_DATE },
        o_gender: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_VARCHAR }
    };

    const employee = await executeProcedureStored(result, 'obtener_empleado')
    console.log(`Employee in the database: ${employee.o_firstname}`);
    res.send(employee);
};

export const deleteEmployee = async (req, res) => {
    const employee = req.body;
    let result = {
        p_id: employee.id,
    }
    const createdEmployee = await executeProcedureStored(result, 'eliminar_empleado')
    console.log(`employee has been deleted`)
    res.send(employee, 200);
};

export const updateEmployee = async (req,res) => {
    const employee = req.body;
    let result = {
        p_id: employee.id,
        p_firstname: employee.firstname,
        p_lastname: employee.lastname,
        p_birthdate: employee.birthdate,
        p_gender: employee.gender,
    }
    const createdEmployee = await executeProcedureStored(result, 'actualizar_empleado')
    console.log(`employee has been updated`)
    res.send(employee, 200);


};