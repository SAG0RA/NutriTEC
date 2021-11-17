CREATE TRIGGER TR_menorDe13
ON cliente
FOR INSERT
AS
BEGIN
	IF (SELECT edad FROM inserted) <  13 RAISERROR ('Si eres menor de 13 no puedes registrarte a NutriTEC', 16, 1)
END