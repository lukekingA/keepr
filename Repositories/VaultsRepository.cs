using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using BCrypt.Net;
using Dapper;
using keepr.Models;

namespace keepr.Repositories
{
  public class VaultsRepository
  {
    private readonly IDbConnection _db;

    public VaultsRepository(IDbConnection db)
    {
      _db = db;
    }

    public IEnumerable<Vault> GetAllForUser(string userId)
    {
      try
      {
        return _db.Query<Vault>("SELECT * FROM vaults WHERE userId = @userId", new { userId });
      }
      catch
      {
        return null;
      }
    }

    public int NewVault(Vault newVault)
    {
      int outVal = -1;
      var madeVault = _db.ExecuteScalar("INSERT INTO vaults (name,description,userId) values(@Name, @Description, @UserId);  SELECT LAST_INSERT_ID();", newVault);
      if (madeVault != null)
      {
        int.TryParse(madeVault.ToString(), out outVal);
      };

      return outVal;
    }

    public Vault EditVault(Vault vault)
    {
      var editVault = _db.Execute("UPDATE vaults SET  id = @Id, name = @Name, description = @Description, userId = @UserId WHERE id = @Id", vault);

      return editVault > 0 ? vault : null;
    }

    public bool DeleteVault(int id)
    {
      return _db.Execute("DELETE FROM vaults WHERE id = @id", new { id }) > 0;
    }
  }
}