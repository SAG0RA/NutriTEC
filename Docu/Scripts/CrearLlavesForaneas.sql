-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [cliente_cedula] in table 'meta_calorica'
ALTER TABLE [dbo].[meta_calorica]
ADD CONSTRAINT [FK__meta_calo__clien__14270015]
    FOREIGN KEY ([cliente_cedula])
    REFERENCES [dbo].[cliente]
        ([cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__meta_calo__clien__14270015'
CREATE INDEX [IX_FK__meta_calo__clien__14270015]
ON [dbo].[meta_calorica]
    ([cliente_cedula]);
GO

-- Creating foreign key on [paciente_cedula] in table 'paciente'
ALTER TABLE [dbo].[paciente]
ADD CONSTRAINT [FK__paciente__pacien__3B40CD36]
    FOREIGN KEY ([paciente_cedula])
    REFERENCES [dbo].[cliente]
        ([cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__paciente__pacien__3B40CD36'
CREATE INDEX [IX_FK__paciente__pacien__3B40CD36]
ON [dbo].[paciente]
    ([paciente_cedula]);
GO

-- Creating foreign key on [cliente_creador] in table 'Recetas'
ALTER TABLE [dbo].[Recetas]
ADD CONSTRAINT [FK__Recetas__cliente__69FBBC1F]
    FOREIGN KEY ([cliente_creador])
    REFERENCES [dbo].[cliente]
        ([cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Recetas__cliente__69FBBC1F'
CREATE INDEX [IX_FK__Recetas__cliente__69FBBC1F]
ON [dbo].[Recetas]
    ([cliente_creador]);
GO

-- Creating foreign key on [cliente_cedula] in table 'registro_peso'
ALTER TABLE [dbo].[registro_peso]
ADD CONSTRAINT [FK__registro___clien__2BFE89A6]
    FOREIGN KEY ([cliente_cedula])
    REFERENCES [dbo].[cliente]
        ([cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__registro___clien__2BFE89A6'
CREATE INDEX [IX_FK__registro___clien__2BFE89A6]
ON [dbo].[registro_peso]
    ([cliente_cedula]);
GO

-- Creating foreign key on [cliente_cedula] in table 'registro_comida'
ALTER TABLE [dbo].[registro_comida]
ADD CONSTRAINT [FK__registro___clien__4C6B5938]
    FOREIGN KEY ([cliente_cedula])
    REFERENCES [dbo].[cliente]
        ([cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__registro___clien__4C6B5938'
CREATE INDEX [IX_FK__registro___clien__4C6B5938]
ON [dbo].[registro_comida]
    ([cliente_cedula]);
GO

-- Creating foreign key on [nutricionista_cedula] in table 'meta_calorica'
ALTER TABLE [dbo].[meta_calorica]
ADD CONSTRAINT [FK__meta_calo__nutri__151B244E]
    FOREIGN KEY ([nutricionista_cedula])
    REFERENCES [dbo].[nutricionista]
        ([n_cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__meta_calo__nutri__151B244E'
CREATE INDEX [IX_FK__meta_calo__nutri__151B244E]
ON [dbo].[meta_calorica]
    ([nutricionista_cedula]);
GO

-- Creating foreign key on [n_cedula] in table 'paciente'
ALTER TABLE [dbo].[paciente]
ADD CONSTRAINT [FK__paciente__n_cedu__3A4CA8FD]
    FOREIGN KEY ([n_cedula])
    REFERENCES [dbo].[nutricionista]
        ([n_cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__paciente__n_cedu__3A4CA8FD'
CREATE INDEX [IX_FK__paciente__n_cedu__3A4CA8FD]
ON [dbo].[paciente]
    ([n_cedula]);
GO

-- Creating foreign key on [nutri_al_plan] in table 'plan_alimenticio'
ALTER TABLE [dbo].[plan_alimenticio]
ADD CONSTRAINT [FK__plan_alim__nutri__7FEAFD3E]
    FOREIGN KEY ([nutri_al_plan])
    REFERENCES [dbo].[nutricionista]
        ([n_cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__plan_alim__nutri__7FEAFD3E'
CREATE INDEX [IX_FK__plan_alim__nutri__7FEAFD3E]
ON [dbo].[plan_alimenticio]
    ([nutri_al_plan]);
GO

-- Creating foreign key on [nutri_cedula] in table 'producto'
ALTER TABLE [dbo].[producto]
ADD CONSTRAINT [FK__producto__nutri___40058253]
    FOREIGN KEY ([nutri_cedula])
    REFERENCES [dbo].[nutricionista]
        ([n_cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__producto__nutri___40058253'
CREATE INDEX [IX_FK__producto__nutri___40058253]
ON [dbo].[producto]
    ([nutri_cedula]);
GO

-- Creating foreign key on [paciente_plan] in table 'paciente'
ALTER TABLE [dbo].[paciente]
ADD CONSTRAINT [FK__paciente__pacien__7E02B4CC]
    FOREIGN KEY ([paciente_plan])
    REFERENCES [dbo].[plan_alimenticio]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__paciente__pacien__7E02B4CC'
CREATE INDEX [IX_FK__paciente__pacien__7E02B4CC]
ON [dbo].[paciente]
    ([paciente_plan]);
GO

-- Creating foreign key on [plan_pertenece] in table 'productosXplan'
ALTER TABLE [dbo].[productosXplan]
ADD CONSTRAINT [FK__productos__plan___7EF6D905]
    FOREIGN KEY ([plan_pertenece])
    REFERENCES [dbo].[plan_alimenticio]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__productos__plan___7EF6D905'
CREATE INDEX [IX_FK__productos__plan___7EF6D905]
ON [dbo].[productosXplan]
    ([plan_pertenece]);
GO

-- Creating foreign key on [codigo_barras] in table 'productosXplan'
ALTER TABLE [dbo].[productosXplan]
ADD CONSTRAINT [FK__productos__codig__00DF2177]
    FOREIGN KEY ([codigo_barras])
    REFERENCES [dbo].[producto]
        ([codigo_barras])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [codigo_barras] in table 'registro_comida'
ALTER TABLE [dbo].[registro_comida]
ADD CONSTRAINT [FK__registro___codig__4D5F7D71]
    FOREIGN KEY ([codigo_barras])
    REFERENCES [dbo].[producto]
        ([codigo_barras])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [cliente_cedula] in table 'productosXreceta'
ALTER TABLE [dbo].[productosXreceta]
ADD CONSTRAINT [FK__productos__clien__0C50D423]
    FOREIGN KEY ([cliente_cedula])
    REFERENCES [dbo].[cliente]
        ([cedula])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__productos__clien__0C50D423'
CREATE INDEX [IX_FK__productos__clien__0C50D423]
ON [dbo].[productosXreceta]
    ([cliente_cedula]);
GO

-- Creating foreign key on [id_receta] in table 'productosXreceta'
ALTER TABLE [dbo].[productosXreceta]
ADD CONSTRAINT [FK__productos__id_re__0B5CAFEA]
    FOREIGN KEY ([id_receta])
    REFERENCES [dbo].[Recetas]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__productos__id_re__0B5CAFEA'
CREATE INDEX [IX_FK__productos__id_re__0B5CAFEA]
ON [dbo].[productosXreceta]
    ([id_receta]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------