using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class VaultKeepController : ControllerBase {

    private readonly VaultKeepRepo _vkr;

    public VaultKeepController (VaultKeepRepo vkr) {
      _vkr = vkr;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Keep>> GetUserVaultKeeps (int vaultId, string userId) {
      IEnumerable<Keep> usrVaultKeeps = _vkr.GetKeepsbyVltandUsr (vaultId, userId);
      if (usrVaultKeeps != null) {
        return Ok (usrVaultKeeps);
      }
      return BadRequest ($"Failed to get users keeps for {userId}user at {vaultId} vault");
    }

    [HttpPost]
    public ActionResult<VaultKeep> NewVaultKeep ([FromBody] VaultKeep newVaultKeep) {
      VaultKeep result = _vkr.NewVaultKeep (newVaultKeep);
      if (result != null) {
        return Ok (result);
      }
      return BadRequest ("Failed to make new vaultkeep");
    }
  }
}