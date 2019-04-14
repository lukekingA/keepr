using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class VaultController : ControllerBase {
    private readonly VaultsRepository _vr;

    public VaultController (VaultsRepository vr) {
      _vr = vr;
    }

    // [HttpGet]
    // public ActionResult<IEnumerable<Keep>> Get () {
    //   IEnumerable<Keep> keepList = _vr. ();
    //   if (keepList != null) {
    //     return Ok (keepList);
    //   }
    //   return BadRequest ("Could not make query");
    // }

    [HttpGet ("{id}")]
    public ActionResult<IEnumerable<Vault>> GetUsers (string id) {
      IEnumerable<Vault> vaultList = _vr.GetAllForUser (id);
      if (vaultList != null) {
        return Ok (vaultList);
      }
      return BadRequest ("Could not find vault by id");
    }

    [HttpPost]
    public ActionResult<Vault> Post ([FromBody] Vault newVault) {
      Vault result = _vr.NewVault (newVault);
      if (result != null) {
        return result;
      }
      return BadRequest ("Couldn't make new vault");
    }

    [HttpPut]
    public ActionResult<Vault> Put ([FromBody] Vault newVault) {
      Vault result = _vr.EditVault (newVault);
      if (result != null) {
        return result;
      }
      return BadRequest ("Could not edit keep");
    }

    [HttpDelete ("{id}")]
    public ActionResult Delete (int id) {
      bool result = _vr.DeleteVault (id);
      if (result) {
        return Ok ("Deleted vault");
      }
      return BadRequest ("Could not find that vault to delete");
    }
  }
}