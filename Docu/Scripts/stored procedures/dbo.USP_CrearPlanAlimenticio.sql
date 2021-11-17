CREATE PROCEDURE [dbo].[USP_CrearPlanAlimenticio]
	@nutri_cedula int,
	@nombre_plan varchar(50)
AS
	INSERT INTO plan_alimenticio(Id,nombre_plan,total_calorias,nutri_al_plan)
	values(CONCAT(@nutri_cedula, '_', @nombre_plan), @nombre_plan, 0, @nutri_cedula)
RETURN 0