using ExpenseManager.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase  // Khai báo Class Controller kế thừa từ ControllerBase
{
    private readonly ExpenseManagerDbContext database;  // Đây là tạo biến kết nối tới database thông qua DbContext

    public CategoriesController(ExpenseManagerDbContext database) //Đây là hàm khỏi tạo Contructor để khởi tạo biến database với DbContext được tiêm vào thông qua Dependency Injection
    {
        this.database = database;
    }

    [HttpGet]
    public IActionResult GetCategories()
    {
        return Ok(database.Categories.ToList());
    }
}