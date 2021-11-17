CREATE PROCEDURE [dbo].[USP_ReporteCobro]
AS
	--seleccionar los nutris y los pacientes asignados a ellos en una tabla temporal
	SELECT nutricionista.n_cedula, nutricionista.nombre, nutricionista.p_apellido, nutricionista.s_apellido, nutricionista.tarjetacredito, nutricionista.tipo_cobro, count(paciente.n_cedula) as numero_clientes, "monto" =
		CASE --calculo del cobro a los nutricionistas
			WHEN nutricionista.tipo_cobro = 'Semanal' THEN (1.0 * count(paciente.n_cedula)) 
			WHEN nutricionista.tipo_cobro = 'Mensual' THEN (1.0 * count(paciente.n_cedula)) - (1.0 * count(paciente.n_cedula))/100 * 5 
			WHEN nutricionista.tipo_cobro = 'Anual' THEN 1.0 * count(paciente.n_cedula) - (1.0 * count(paciente.n_cedula))/100 * 10
		END
	FROM [dbo].[paciente] 
	LEFT JOIN nutricionista
	ON (nutricionista.n_cedula = paciente.n_cedula) --join entre la lista de pacientes y los nutricionistas

	GROUP BY
	[dbo].[nutricionista].n_cedula,
	[dbo].[nutricionista].n_cedula,
	[dbo].[nutricionista].nombre,
	[dbo].[nutricionista].p_apellido,
	[dbo].[nutricionista].s_apellido,
	[dbo].[nutricionista].tarjetacredito,
	[dbo].[nutricionista].tipo_cobro

RETURN 0