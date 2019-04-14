using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using BCrypt.Net;
using Dapper;
using keepr.Models;

namespace keepr.Repositories {
  public class VaultsRepository {
    private readonly IDbConnection _db;

    public VaultsRepository (IDbConnection db) {
      _db = db;
    }

    public IEnumerable<Vault> GetAllForUser (string userId) {
      try {
        return _db.Query<Vault> ("SELECT * FROM vaults WHERE userId = @userId", new { userId });
      } catch {
        return null;
      }
    }

    public Vault NewVault (Vault newVault) {

      var madeVault = _db.Execute ("INSERT INTO vaults (name,description,userId) values(@Name, @Description, @UserId)", newVault);
      return madeVault > 0 ? newVault : null;
    }

    public Vault EditVault (Vault vault) {
      var editVault = _db.Execute ("UPDATE vaults SET  id = @Id, name = @Name, description = @Description, userId = @UserId WHERE id = @Id", vault);

      return editVault > 0 ? vault : null;
    }

    public bool DeleteVault (int id) {
      return _db.Execute ("DELETE FROM vaults WHERE id = @id", new { id }) > 0;
    }
  }
}