using System.Collections.Generic;
using System.Data;
using Dapper;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Repositories {
  public class VaultKeepRepo {
    private readonly IDbConnection _db;

    public VaultKeepRepo (IDbConnection db) {
      _db = db;
    }

    public IEnumerable<Keep> GetKeepsbyVltandUsr (int vaultId, string userId) {
      try {
        return _db.Query<Keep> (@"SELECT * FROM vaultkeeps AS vk 
        INNER JOIN keeps AS k ON vk.keepId = k.id
        AND k.userId = @userId 
        WHERE vk.vaultId = @vaultId", new { vaultId, userId });
      } catch {
        return null;
      }
    }

    //Used when new keep is made or coppied by other user. new vk is made with the current user and the vault of their choice.
    public VaultKeep NewVaultKeep (VaultKeep vk) {
      var newVK = _db.ExecuteScalar<VaultKeep> (@"
     INSERT INTO vaultkeeps (vaultId,keepId,userId) 
     VALUES (vaultId = @VaultId, keepId = @KeepId, userId = @UserId)",
        vk);
      if (newVK != null) {
        return vk;
      }
      return null;
    }
  }
}