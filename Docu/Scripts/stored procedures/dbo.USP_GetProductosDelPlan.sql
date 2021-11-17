CREATE PROCEDURE [dbo].[USP_GetProductosDelPlan]
	@id_plan varchar(50)
AS
	SELECT * FROM PRODUCTOSXPLAN WHERE plan_pertenece = @id_plan;
RETURN 0