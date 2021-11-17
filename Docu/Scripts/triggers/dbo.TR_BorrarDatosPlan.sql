CREATE TRIGGER TR_BorrarDatosPlan
ON plan_alimenticio
INSTEAD OF DELETE
AS
BEGIN
	DECLARE @plan_borrado VARCHAR(50)

	SET @plan_borrado =
		(SELECT Id from deleted)

	DELETE FROM productosXplan where plan_pertenece = @plan_borrado
	UPDATE paciente
		SET paciente_plan = NULL
		WHERE paciente_plan = @plan_borrado;

	DELETE FROM plan_alimenticio where Id = @plan_borrado


END