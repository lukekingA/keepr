using System;
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
    public int NewVaultKeep (VaultKeep vk) {
      int outVal = -1;
      var newVK = _db.ExecuteScalar (@"
     INSERT INTO vaultkeeps (vaultId,keepId,userId) 
     VALUES (@VaultId, @KeepId, @UserId); SELECT LAST_INSERT_ID()",
        vk);
      if (newVK != null) {
        int.TryParse (newVK.ToString (), out outVal);
      };

      return outVal;
    }

    internal bool DeleteVaultKeep (int id) {
      return _db.Execute ("DELETE FROM  vaultKeeps WHERE id = @id", new { id }) > 0;

    }
  }
}