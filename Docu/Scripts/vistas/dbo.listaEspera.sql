CREATE VIEW [dbo].[listaEspera]
	AS SELECT 
	codigo_barras,
	descripcion,
	porcion,
	energia,
	grasa,
	sodio,
	carbohidratos,
	proteina,
	vitaminas,
	calcio,
	hierro,
	nutri_correo, 
	lista_espera FROM [producto]
	WHERE lista_espera = 0;