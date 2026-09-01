using System;
using System.Collections.Generic;

namespace ExpenseManager.Api.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string CategoryType { get; set; } = null!;

    public string? Icon { get; set; }

    public string? Color { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<ExpenseTransaction> ExpenseTransactions { get; set; } = new List<ExpenseTransaction>();
}
