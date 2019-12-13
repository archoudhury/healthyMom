using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyMom.Models
{
    public class Appointment
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public short Type { get; set; }
        public DateTime Date { get; set; }
        public bool IsCompleted { get; set; }
        public long MotherId { get; set; }
        public long ApproverId { get; set; }
        public int Otp { get; set; }
        public DateTime OtpExpiry { get; set; }
        public bool IsOtpVerified { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? UpdatedBy { get; set; }
    }
}
