CREATE PROCEDURE [dbo].[USP_Registro_Peso]
	@cedula_cliente int
AS
	SELECT * FROM registro_peso
	WHERE registro_peso.cliente_cedula = @cedula_cliente 
RETURN 0