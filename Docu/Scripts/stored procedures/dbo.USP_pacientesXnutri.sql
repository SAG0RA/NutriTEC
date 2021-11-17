CREATE PROCEDURE [dbo].[USP_pacientesXnutri]
	@n_cedula int
AS
	SELECT c.cedula, c.nombre, c.p_apellido, c.s_apellido, c.edad, c.fecha_nac, c.peso, c.pais, 
	c.IMC, c.cintura, c.cuello, c.caderas, c.porc_grasa, c.porc_musculo, c.cdm_calorias, 
	paciente_plan as plan_suscrito
	FROM cliente c
	INNER JOIN paciente p
	ON (c.cedula = p.paciente_cedula AND p.n_cedula = @n_cedula)
RETURN 0