//------------------------------------------------------------------------------
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
    
    public partial class USP_Registro_Peso_Result
    {
        public int Id { get; set; }
        public Nullable<int> cliente_cedula { get; set; }
        public Nullable<System.DateTime> fecha_del_registro { get; set; }
        public Nullable<double> peso { get; set; }
        public Nullable<double> IMC { get; set; }
        public Nullable<int> cintura { get; set; }
        public Nullable<int> cuello { get; set; }
        public Nullable<int> caderas { get; set; }
        public Nullable<int> porc_musculo { get; set; }
        public Nullable<int> porc_grasa { get; set; }
    }
}
