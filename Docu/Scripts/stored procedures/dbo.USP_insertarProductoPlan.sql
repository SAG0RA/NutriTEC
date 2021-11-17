CREATE PROCEDURE [dbo].[USP_insertarProductoPlan]
	@codigo_barras bigint,
	@tiempo_comida varchar(50),
	@plan_pertenece varchar(50),
	@cantidad int
AS
	INSERT INTO productosXplan (codigo_barras, descripcion, energia, tiempo_comida, cantidad, plan_pertenece)
	SELECT 
		codigo_barras, 
		descripcion,
		energia,
		@tiempo_comida,
		@cantidad,
		@plan_pertenece
	FROM 
		productosDisponibles
	WHERE codigo_barras = @codigo_barras;	
RETURN 0