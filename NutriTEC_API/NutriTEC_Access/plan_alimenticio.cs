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
    
    public partial class plan_alimenticio
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public plan_alimenticio()
        {
            this.paciente = new HashSet<paciente>();
            this.productosXplan = new HashSet<productosXplan>();
        }
    
        public int Id { get; set; }
        public string nombre_plan { get; set; }
        public Nullable<double> total_calorias { get; set; }
        public Nullable<int> nutri_al_plan { get; set; }
    
        public virtual nutricionista nutricionista { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<paciente> paciente { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<productosXplan> productosXplan { get; set; }
    }
}
