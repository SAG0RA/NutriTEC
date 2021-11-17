CREATE PROCEDURE [dbo].[USP_CalcularCaloriasDelPlan]
	@id_plan varchar(50)
AS
	DECLARE @calorias float;

	SET @calorias = 
		(SELECT SUM(energia) from [dbo].[productosXplan]
		WHERE plan_pertenece = @id_plan)

	UPDATE plan_alimenticio 
		SET total_calorias = @calorias
		WHERE Id = @id_plan;
	
RETURN 0