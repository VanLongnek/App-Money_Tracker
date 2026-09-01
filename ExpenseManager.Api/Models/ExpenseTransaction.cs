using System;
using System.Collections.Generic;

namespace ExpenseManager.Api.Models;

public partial class ExpenseTransaction
{
    public int TransactionId { get; set; }

    public int CategoryId { get; set; }

    public decimal Amount { get; set; }

    public string? Note { get; set; }

    public DateOnly TransactionDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Category Category { get; set; } = null!;
}
