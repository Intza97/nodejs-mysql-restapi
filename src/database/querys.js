export const querys = {
  getTurnos: "SELECT * FROM [dbo].[Turnos]",
  createNewTurnos:
    "INSERT INTO [dbo].[Turnos] (Fecha, Hora, Nombre, Apellido, Telefono) VALUES (@Fecha, @Hora, @Nombre, @Apellido, @Telefono)",
  getTurnosById: "SELECT * FROM [dbo].[Turnos] Where ID_Turno = @id",
  deleteTurnosById:
    "DELETE FROM [BD_Makeup].[dbo].[Turnos] Where ID_Turno = @id",
  getTotalTurnos: "SELECT COUNT(*) FROM [dbo].[Turnos]",
  updateTurnosById:
    "UPDATE [dbo].[Turnos] SET Fecha = @Fecha, Hora = @Hora, Nombre = @Nombre, Apellido = @Apellido, Telefono = @Telefono Where ID_Turno = @id",
};
