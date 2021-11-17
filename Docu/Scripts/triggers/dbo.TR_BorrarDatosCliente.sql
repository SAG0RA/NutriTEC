CREATE TRIGGER TR_BorrarDatosCliente
ON cliente
INSTEAD OF DELETE
AS
BEGIN
	DECLARE @cedula_borrada int 

	SET @cedula_borrada = 
		(SELECT cedula from deleted)

	DELETE FROM paciente where paciente_cedula = @cedula_borrada
	DELETE FROM registro_comida where cliente_cedula = @cedula_borrada
	DELETE FROM registro_peso where cliente_cedula = @cedula_borrada
	DELETE FROM Recetas where cliente_creador = @cedula_borrada
	DELETE FROM meta_calorica where cliente_cedula = @cedula_borrada
	DELETE FROM cliente where cedula = @cedula_borrada

END