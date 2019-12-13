using System;

namespace HealthyMom.ViewModelsAndEnum
{
    public class MotherRegistration
    {
        public long MotherId { get; set; }
        public string MotherName { get; set; }
        public string Aadhar { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public string Zip { get; set; }
        public string DoctorVisitDayOfMonth { get; set; }
        public string AnganwadiVisitDayOfWeek { get; set; }
        public long AnganwadiId { get; set; }
        public DateTime FertilityDate { get; set; }
        public DateTime ExpectedDeliveryDate { get; set; }
        public long DoctorId { get; set; }
        public bool IsHivInfected { get; set; }
        public string OtherComplications { get; set; }
        public short NumberOfBabies { get; set; }
        public short NumberOfPregnency { get; set; }
        public string HusbandName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}