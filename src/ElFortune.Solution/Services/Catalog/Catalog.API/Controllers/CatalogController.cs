using Microsoft.AspNetCore.Mvc;

namespace ElFortune.Services.Catalog.API.Controllers;

[ApiController]
[Route("[controller]")]
public class CatalogController : ControllerBase
{
    private readonly ILogger<CatalogController> _logger;

    public CatalogController(ILogger<CatalogController> logger)
    {
        _logger = logger;
    }

    // get all

    // get {id}

    // get {name}

    // post {id}

    // put {id}

    // delete {id}

    // delete 
}