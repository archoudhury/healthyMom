using System;

namespace HealthyMom.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string HospitalName { get; set; }
        public string Address { get; set; }
        public string Zip { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? UpdatedBy { get; set; }
    }
}