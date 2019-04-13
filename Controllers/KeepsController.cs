using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers {
  [Route ("keep")]
  [ApiController]
  public class KeepsController : ControllerBase {
    private readonly KeepsRepository _kr;

    public KeepsController (KeepsRepository kr) {
      _kr = kr;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Keep>> Get () {
      IEnumerable<Keep> keepList = _kr.GetAllPublic ();
      if (keepList != null) {
        return Ok (keepList);
      }
      return BadRequest ("Could not make query");
    }

    [HttpGet ("{id}")]
    public ActionResult<IEnumerable<Keep>> GetUsers (string id) {
      IEnumerable<Keep> keepList = _kr.GetAllForUser (id);
      if (keepList != null) {
        return Ok (keepList);
      }
      return BadRequest ("Could not find keep by id");
    }

    [HttpPost]
    public ActionResult<Keep> Post ([FromBody] Keep newKeep) {
      Keep result = _kr.NewKeep (newKeep);
      if (result != null) {
        return result;
      }
      return BadRequest ("Couldn't make new keep");
    }

    [HttpPut ("{id}")]
    public ActionResult<Keep> Put (int id, [FromBody] Keep newKeep) {
      Keep result = _kr.EditKeep (id, newKeep);
      if (result != null) {
        return result;
      }
      return BadRequest ("Could not edit keep");
    }

    [HttpDelete ("{id}")]
    public ActionResult Delete (int id) {
      bool result = _kr.DeleteKeep (id);
      if (result) {
        return Ok ("Deleted keep");
      }
      return BadRequest ("Could not find that keep to delete");
    }
  }
}