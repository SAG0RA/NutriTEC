﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace NutriTEC_Access
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class NutriTECEntities : DbContext
    {
        public NutriTECEntities()
            : base("name=NutriTECEntities")
        {
            Configuration.ProxyCreationEnabled = false;

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<cliente> cliente { get; set; }
        public virtual DbSet<Empleado> Empleado { get; set; }
        public virtual DbSet<meta_calorica> meta_calorica { get; set; }
        public virtual DbSet<nutricionista> nutricionista { get; set; }
        public virtual DbSet<paciente> paciente { get; set; }
        public virtual DbSet<plan_alimenticio> plan_alimenticio { get; set; }
        public virtual DbSet<producto> producto { get; set; }
        public virtual DbSet<productosXplan> productosXplan { get; set; }
        public virtual DbSet<Recetas> Recetas { get; set; }
        public virtual DbSet<registro_comida> registro_comida { get; set; }
        public virtual DbSet<registro_peso> registro_peso { get; set; }
        public virtual DbSet<listaEspera> listaEspera { get; set; }
        public virtual DbSet<productosDisponibles> productosDisponibles { get; set; }
    
        public virtual int USP_CalcularCaloriasDelPlan(string id_plan)
        {
            var id_planParameter = id_plan != null ?
                new ObjectParameter("id_plan", id_plan) :
                new ObjectParameter("id_plan", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("USP_CalcularCaloriasDelPlan", id_planParameter);
        }
    
        public virtual ObjectResult<USP_GetProductosDelPlan_Result> USP_GetProductosDelPlan(string id_plan)
        {
            var id_planParameter = id_plan != null ?
                new ObjectParameter("id_plan", id_plan) :
                new ObjectParameter("id_plan", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<USP_GetProductosDelPlan_Result>("USP_GetProductosDelPlan", id_planParameter);
        }
    
        public virtual int USP_insertarProductoPlan(Nullable<long> codigo_barras, string tiempo_comida, string plan_pertenece, Nullable<int> cantidad)
        {
            var codigo_barrasParameter = codigo_barras.HasValue ?
                new ObjectParameter("codigo_barras", codigo_barras) :
                new ObjectParameter("codigo_barras", typeof(long));
    
            var tiempo_comidaParameter = tiempo_comida != null ?
                new ObjectParameter("tiempo_comida", tiempo_comida) :
                new ObjectParameter("tiempo_comida", typeof(string));
    
            var plan_perteneceParameter = plan_pertenece != null ?
                new ObjectParameter("plan_pertenece", plan_pertenece) :
                new ObjectParameter("plan_pertenece", typeof(string));
    
            var cantidadParameter = cantidad.HasValue ?
                new ObjectParameter("cantidad", cantidad) :
                new ObjectParameter("cantidad", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("USP_insertarProductoPlan", codigo_barrasParameter, tiempo_comidaParameter, plan_perteneceParameter, cantidadParameter);
        }
    
        public virtual ObjectResult<USP_pacientesXnutri_Result> USP_pacientesXnutri(Nullable<int> n_cedula)
        {
            var n_cedulaParameter = n_cedula.HasValue ?
                new ObjectParameter("n_cedula", n_cedula) :
                new ObjectParameter("n_cedula", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<USP_pacientesXnutri_Result>("USP_pacientesXnutri", n_cedulaParameter);
        }
    
        public virtual ObjectResult<USP_ReporteCobro_Result> USP_ReporteCobro()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<USP_ReporteCobro_Result>("USP_ReporteCobro");
        }
    }
}
