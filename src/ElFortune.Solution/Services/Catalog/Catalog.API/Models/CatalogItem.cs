namespace ElFortune.Services.Catalog.API.Models;

public class CatalogItem
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string CatalogBrand { get; set; } = null!;
    public string CatalogType { get; set; } = null!;
}