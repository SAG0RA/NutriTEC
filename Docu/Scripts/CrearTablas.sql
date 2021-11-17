-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'cliente'
CREATE TABLE [dbo].[cliente] (
    [cedula] int  NOT NULL,
    [nombre] varchar(50)  NULL,
    [p_apellido] varchar(50)  NULL,
    [s_apellido] varchar(50)  NULL,
    [edad] int  NULL,
    [fecha_nac] datetime  NULL,
    [peso] float  NULL,
    [IMC] float  NULL,
    [pais] varchar(50)  NULL,
    [cintura] float  NULL,
    [cuello] float  NULL,
    [caderas] float  NULL,
    [porc_musculo] float  NULL,
    [porc_grasa] float  NULL,
    [cdm_calorias] float  NULL,
    [correo] varchar(100)  NOT NULL,
    [passw] varchar(50)  NOT NULL
);
GO

-- Creating table 'Empleado'
CREATE TABLE [dbo].[Empleado] (
    [cedula] int  NOT NULL,
    [nombre] varchar(50)  NOT NULL,
    [correo] varchar(50)  NOT NULL,
    [passw] varchar(50)  NOT NULL,
    [rol] varchar(50)  NOT NULL
);
GO

-- Creating table 'meta_calorica'
CREATE TABLE [dbo].[meta_calorica] (
    [id_meta] int  NOT NULL,
    [fecha_meta] datetime  NOT NULL,
    [meta_calorias_dia] int  NOT NULL,
    [calorias_logradas] int  NULL,
    [cliente_cedula] int  NULL,
    [nutricionista_cedula] int  NULL
);
GO

-- Creating table 'nutricionista'
CREATE TABLE [dbo].[nutricionista] (
    [n_cedula] int  NOT NULL,
    [nombre] varchar(50)  NULL,
    [p_apellido] varchar(50)  NULL,
    [s_apellido] varchar(50)  NULL,
    [codigo] varchar(50)  NULL,
    [edad] int  NULL,
    [fecha_nac] datetime  NULL,
    [peso] varchar(50)  NULL,
    [IMC] float  NULL,
    [direccion] varchar(100)  NULL,
    [foto] varchar(200)  NULL,
    [tarjetacredito] bigint  NULL,
    [tipo_cobro] varchar(50)  NULL,
    [correo] varchar(100)  NULL,
    [passw] varchar(50)  NULL
);
GO

-- Creating table 'paciente'
CREATE TABLE [dbo].[paciente] (
    [id] int IDENTITY(1,1) NOT NULL,
    [n_cedula] int  NOT NULL,
    [paciente_cedula] int  NOT NULL,
    [paciente_plan] varchar(50)  NULL
);
GO

-- Creating table 'plan_alimenticio'
CREATE TABLE [dbo].[plan_alimenticio] (
    [Id] varchar(50)  NOT NULL,
    [nombre_plan] varchar(50)  NULL,
    [total_calorias] float  NULL,
    [nutri_al_plan] int  NULL
);
GO

-- Creating table 'producto'
CREATE TABLE [dbo].[producto] (
    [codigo_barras] bigint  NOT NULL,
    [descripcion] varchar(50)  NULL,
    [porcion] float  NULL,
    [energia] float  NULL,
    [grasa] float  NULL,
    [sodio] float  NULL,
    [carbohidratos] float  NULL,
    [proteina] float  NULL,
    [vitaminas] varchar(50)  NULL,
    [calcio] float  NULL,
    [hierro] float  NULL,
    [lista_espera] int  NULL,
    [nutri_cedula] int  NULL,
    [nutri_correo] varchar(100)  NULL
);
GO

-- Creating table 'productosXplan'
CREATE TABLE [dbo].[productosXplan] (
    [codigo_barras] bigint  NOT NULL,
    [descripcion] varchar(50)  NOT NULL,
    [energia] float  NOT NULL,
    [tiempo_comida] varchar(50)  NOT NULL,
    [plan_pertenece] varchar(50)  NOT NULL,
    [cantidad] int  NOT NULL
);
GO

-- Creating table 'Recetas'
CREATE TABLE [dbo].[Recetas] (
    [id] int  NOT NULL,
    [nombre_receta] varchar(50)  NULL,
    [energía] float  NULL,
    [grasa] float  NULL,
    [sodio] float  NULL,
    [carbohidratos] float  NULL,
    [proteinas] float  NULL,
    [cliente_creador] int  NULL
);
GO

-- Creating table 'registro_comida'
CREATE TABLE [dbo].[registro_comida] (
    [cliente_cedula] int  NULL,
    [fecha_del_registro] datetime  NULL,
    [codigo_barras] bigint  NOT NULL
);
GO

-- Creating table 'registro_peso'
CREATE TABLE [dbo].[registro_peso] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [cliente_cedula] int  NULL,
    [fecha_del_registro] datetime  NULL,
    [peso] float  NULL,
    [IMC] float  NULL,
    [cintura] int  NULL,
    [cuello] int  NULL,
    [caderas] int  NULL,
    [porc_musculo] int  NULL,
    [porc_grasa] int  NULL
);
GO

-- Creating table 'listaEspera'
CREATE TABLE [dbo].[listaEspera] (
    [codigo_barras] bigint  NOT NULL,
    [descripcion] varchar(50)  NULL,
    [porcion] float  NULL,
    [energia] float  NULL,
    [grasa] float  NULL,
    [sodio] float  NULL,
    [carbohidratos] float  NULL,
    [proteina] float  NULL,
    [vitaminas] varchar(50)  NULL,
    [calcio] float  NULL,
    [hierro] float  NULL,
    [nutri_correo] varchar(100)  NULL,
    [lista_espera] int  NULL
);
GO

-- Creating table 'productosDisponibles'
CREATE TABLE [dbo].[productosDisponibles] (
    [codigo_barras] bigint  NOT NULL,
    [descripcion] varchar(50)  NULL,
    [porcion] float  NULL,
    [energia] float  NULL,
    [grasa] float  NULL,
    [sodio] float  NULL,
    [carbohidratos] float  NULL,
    [proteina] float  NULL,
    [vitaminas] varchar(50)  NULL,
    [calcio] float  NULL,
    [hierro] float  NULL
);
GO

-- Creating table 'productosXreceta'
CREATE TABLE [dbo].[productosXreceta] (
    [codigo_barras] bigint  NOT NULL,
    [descripcion] varchar(50)  NOT NULL,
    [energia] float  NOT NULL,
    [id_receta] int  NOT NULL,
    [cliente_cedula] int  NOT NULL,
    [cantidad] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [cedula] in table 'cliente'
ALTER TABLE [dbo].[cliente]
ADD CONSTRAINT [PK_cliente]
    PRIMARY KEY CLUSTERED ([cedula] ASC);
GO

-- Creating primary key on [cedula] in table 'Empleado'
ALTER TABLE [dbo].[Empleado]
ADD CONSTRAINT [PK_Empleado]
    PRIMARY KEY CLUSTERED ([cedula] ASC);
GO

-- Creating primary key on [id_meta] in table 'meta_calorica'
ALTER TABLE [dbo].[meta_calorica]
ADD CONSTRAINT [PK_meta_calorica]
    PRIMARY KEY CLUSTERED ([id_meta] ASC);
GO

-- Creating primary key on [n_cedula] in table 'nutricionista'
ALTER TABLE [dbo].[nutricionista]
ADD CONSTRAINT [PK_nutricionista]
    PRIMARY KEY CLUSTERED ([n_cedula] ASC);
GO

-- Creating primary key on [id] in table 'paciente'
ALTER TABLE [dbo].[paciente]
ADD CONSTRAINT [PK_paciente]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [Id] in table 'plan_alimenticio'
ALTER TABLE [dbo].[plan_alimenticio]
ADD CONSTRAINT [PK_plan_alimenticio]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [codigo_barras] in table 'producto'
ALTER TABLE [dbo].[producto]
ADD CONSTRAINT [PK_producto]
    PRIMARY KEY CLUSTERED ([codigo_barras] ASC);
GO

-- Creating primary key on [codigo_barras], [tiempo_comida], [plan_pertenece] in table 'productosXplan'
ALTER TABLE [dbo].[productosXplan]
ADD CONSTRAINT [PK_productosXplan]
    PRIMARY KEY CLUSTERED ([codigo_barras], [tiempo_comida], [plan_pertenece] ASC);
GO

-- Creating primary key on [id] in table 'Recetas'
ALTER TABLE [dbo].[Recetas]
ADD CONSTRAINT [PK_Recetas]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [codigo_barras] in table 'registro_comida'
ALTER TABLE [dbo].[registro_comida]
ADD CONSTRAINT [PK_registro_comida]
    PRIMARY KEY CLUSTERED ([codigo_barras] ASC);
GO

-- Creating primary key on [Id] in table 'registro_peso'
ALTER TABLE [dbo].[registro_peso]
ADD CONSTRAINT [PK_registro_peso]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [codigo_barras] in table 'listaEspera'
ALTER TABLE [dbo].[listaEspera]
ADD CONSTRAINT [PK_listaEspera]
    PRIMARY KEY CLUSTERED ([codigo_barras] ASC);
GO

-- Creating primary key on [codigo_barras] in table 'productosDisponibles'
ALTER TABLE [dbo].[productosDisponibles]
ADD CONSTRAINT [PK_productosDisponibles]
    PRIMARY KEY CLUSTERED ([codigo_barras] ASC);
GO

-- Creating primary key on [codigo_barras], [id_receta], [cliente_cedula] in table 'productosXreceta'
ALTER TABLE [dbo].[productosXreceta]
ADD CONSTRAINT [PK_productosXreceta]
    PRIMARY KEY CLUSTERED ([codigo_barras], [id_receta], [cliente_cedula] ASC);
GO
