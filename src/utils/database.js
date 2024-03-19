import oracledb from 'oracledb'

oracledb.autoCommit = true

const connectionProperties = {
    user: process.env.DBAAS_USER_NAME || "admin",
    password: process.env.DBAAS_USER_PASSWORD || "Empleados14220309.",
    connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "(description= (retry_count=0)(retry_delay=0)(address=(protocol=tcps)(port=1521)(host=adb.sa-bogota-1.oraclecloud.com))(connect_data=(service_name=g2c635ee74f33b6_employees_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"
}

export const executeRawQuery = async rawSql => {
    const connection = await oracledb.getConnection(connectionProperties)
    const data = await connection.execute(rawSql)
    return data.rows
}

export const executeProcedureStoredCursor = async procedureStored => {
    let result = {
        outCursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
    };
    const connection = await oracledb.getConnection(connectionProperties)
    const resultProcedure = await connection.execute(
        `BEGIN
         ${procedureStored}(:outCursor);
       END;`,
        result
    );
    // Obtener el cursor de salida
    const resultSet = resultProcedure.outBinds.outCursor;
    let rows = await resultSet.getRows();
    await resultSet.close();
    return rows
}

export const executeProcedureStored = async (parameters, procedureStored) => {
    const connection = await oracledb.getConnection(connectionProperties)
    const resultProcedure = await connection.execute(
        `BEGIN
         ${procedureStored}(${getParametersProcedureStored(parameters)});
       END;`,
        parameters
    );
    console.log(resultProcedure);
    return resultProcedure.outBinds
}

const getParametersProcedureStored = parameters => {
    let keys = Object.keys(parameters)
    keys = keys.map(key => {
        return `:${key}`
    })
    return keys.join(', ')
}

