using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers {
  [Route ("vaultkeep")]
  [ApiController]
  public class VaultKeepController : ControllerBase {

    private readonly VaultKeepRepo _vkr;

    public VaultKeepController (VaultKeepRepo vkr) {
      _vkr = vkr;
    }

    [HttpGet]
  }
}