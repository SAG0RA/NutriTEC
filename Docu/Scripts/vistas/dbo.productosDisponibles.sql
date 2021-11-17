CREATE VIEW [dbo].[productosDisponibles]
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
	hierro
	FROM [producto]
	WHERE lista_espera = 1;