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
      return _db.Query<Vault> ("SELECT * vaults WHERE userId = @userId", new { userId });
    }

    public Vault NewVault (Vault newVault) {
      _db.ExecuteScalar ("INSERT INTO vaults (name,description,userId,img,isPravate values(name = @Name,description = @Description, userId = @UserId, isPrivate = @IsPrivate))", newVault);
      return newVault;
    }

    public Vault EditVault (Vault vault) {
      _db.ExecuteScalar ("UPDATE vaults SET id = @ID, name = @Name, description = @Description, userId = @UserId WHERE id = @Id", vault);

      return vault;
    }

    public bool DeleteKeep (int id) {
      return _db.Execute ("DELETE FROM vaults WHERE id = @id", new { id }) > 0;
    }
  }
}