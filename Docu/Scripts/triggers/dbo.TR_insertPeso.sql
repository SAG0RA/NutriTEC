CREATE TRIGGER TR_insertPeso 
ON cliente
AFTER INSERT
AS
BEGIN
	
	INSERT INTO registro_peso (cliente_cedula, fecha_del_registro, peso,IMC, cintura, cuello, caderas, porc_musculo, porc_grasa)
	SELECT 
		cedula,
		GETDATE(),
		peso,
		IMC,
		cintura,
		cuello,
		caderas,
		porc_musculo,
		porc_grasa
	FROM inserted
END