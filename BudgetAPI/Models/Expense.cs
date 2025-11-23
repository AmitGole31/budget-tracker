using System;

namespace BudgetAPI.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Category { get; set; } = "Other";
        public DateTime Date { get; set; } = DateTime.Now;
        public string Description { get; set; } = string.Empty;
    }
}

 