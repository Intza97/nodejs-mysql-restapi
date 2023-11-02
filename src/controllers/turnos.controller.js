import { getConnection, sql, querys } from "../database"; // Asegúrate de importar sql y getConnection desde el archivo de conexión

export const getTurnos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getTurnos);

    res.json(result.recordsets);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewTurnos = async (req, res) => {
  const { Fecha, Hora, Nombre, Apellido, Telefono } = req.body;

  //function isNull(value) {
  //return value == null;
  //}

  if (
    Fecha === null ||
    Hora === null ||
    Nombre === null ||
    Apellido === null ||
    Telefono === null
  ) {
    return res.status(400).json({ msg: "Importante! Llena todo los campos" });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("Fecha", sql.VarChar, Fecha)
      .input("Hora", sql.VarChar, Hora)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Apellido", sql.VarChar, Apellido)
      .input("Telefono", sql.VarChar, Telefono)
      .query(querys.createNewTurnos);

    res.status(201).json({
      Fecha,
      Hora,
      Nombre,
      Apellido,
      Telefono,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTurnosById = async (req, res) => {
  try {
    const { id } = req.params; // El parámetro se llama 'id', no 'id_producto'
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id) // Usamos 'id' como parámetro
      .query(querys.getTurnosById); // Consulta SQL para obtener el producto

    if (result.recordset.length === 0) {
      // Si no se encuentra ningún turno con ese ID, devolvemos un mensaje de error
      res.status(404).send("Turno no encontrado");
    } else {
      res.status(200).send(result.recordset[0]);
    }
  } catch (error) {
    res.status(500).send("Error al obtener el turno");
  }
};

export const deleteTurnosById = async (req, res) => {
  try {
    const { id } = req.params; // El parámetro se llama 'id', no 'id_producto'
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id) // Usamos 'id' como parámetro
      .query(querys.deleteTurnosById); // Consulta SQL para obtener el producto

    if (result.recordset.length === 0) {
      // Si no se encuentra ningún producto con ese ID, devolvemos un mensaje de error
      res.status(404).send("Turno no encontrado");
    } else {
      res.status(200).send(result.recordset[0]);
    }
  } catch (error) {
    res.status(500).send("Turno eliminado");
  }
};

export const getTotalTurnos = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(querys.getTotalTurnos);

  res.json(result.recordset[0][""]);
};

export const updateTurnosById = async (req, res) => {
  try {
    const { Fecha, Hora, Nombre, Apellido, Telefono } = req.body;
    const { id } = req.params;

    if (!Fecha || !Hora || !Nombre || !Apellido || !Telefono) {
      return res.status(400).json({ msg: "Campos requeridos incompletos" });
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("Fecha", sql.VarChar, Fecha)
      .input("Hora", sql.VarChar, Hora)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Apellido", sql.VarChar, Apellido)
      .input("Telefono", sql.VarChar, Telefono)
      .query(querys.updateTurnosById);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Turno no encontrado" });
    }

    res.status(200).json({
      Fecha,
      Hora,
      Nombre,
      Apellido,
      Telefono,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en la actualización del turno" });
  }
};
