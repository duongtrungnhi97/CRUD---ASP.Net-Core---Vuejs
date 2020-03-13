using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class FoodRecord
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public DateTime DateTime { get; set; }
    }
}
