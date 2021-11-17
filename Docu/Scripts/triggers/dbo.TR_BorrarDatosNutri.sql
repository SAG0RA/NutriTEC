CREATE TRIGGER TR_BorrarDatosNutri
ON nutricionista
INSTEAD OF DELETE
AS
BEGIN
	DECLARE @cedula_borrada int 

	SET @cedula_borrada = 
		(SELECT n_cedula from deleted)

	DELETE FROM paciente where n_cedula = @cedula_borrada
	DELETE FROM plan_alimenticio where nutri_al_plan = @cedula_borrada
	DELETE FROM nutricionista where n_cedula = @cedula_borrada
	

END