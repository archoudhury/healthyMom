using System;
using System.Collections.Generic;

namespace HealthyMom.Models
{
    public partial class Mother
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public string HusbandName { get; set; }
        public DateTime FertilityDate { get; set; }
        public DateTime ExpectedDeliveryDate { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string Zip { get; set; }
        public long Anganwadi { get; set; }
        public short NumberOfBabies { get; set; }
        public short NumberOfPregnency { get; set; }
        public bool IsHivInfected { get; set; }
        public string OtherComplications { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? Updatedby { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
