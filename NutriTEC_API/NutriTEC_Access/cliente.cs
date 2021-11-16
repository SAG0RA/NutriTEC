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
    using System.Collections.Generic;
    
    public partial class cliente
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public cliente()
        {
            this.meta_calorica = new HashSet<meta_calorica>();
            this.paciente = new HashSet<paciente>();
            this.Recetas = new HashSet<Recetas>();
            this.registro_peso = new HashSet<registro_peso>();
            this.registro_comida = new HashSet<registro_comida>();
            this.productosXreceta = new HashSet<productosXreceta>();
        }
    
        public int cedula { get; set; }
        public string nombre { get; set; }
        public string p_apellido { get; set; }
        public string s_apellido { get; set; }
        public Nullable<int> edad { get; set; }
        public Nullable<System.DateTime> fecha_nac { get; set; }
        public Nullable<double> peso { get; set; }
        public Nullable<double> IMC { get; set; }
        public string pais { get; set; }
        public Nullable<double> cintura { get; set; }
        public Nullable<double> cuello { get; set; }
        public Nullable<double> caderas { get; set; }
        public Nullable<double> porc_musculo { get; set; }
        public Nullable<double> porc_grasa { get; set; }
        public Nullable<double> cdm_calorias { get; set; }
        public string correo { get; set; }
        public string passw { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<meta_calorica> meta_calorica { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<paciente> paciente { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Recetas> Recetas { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<registro_peso> registro_peso { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<registro_comida> registro_comida { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<productosXreceta> productosXreceta { get; set; }
    }
}
