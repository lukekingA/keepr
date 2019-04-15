using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using BCrypt.Net;
using Dapper;
using keepr.Models;

namespace keepr.Repositories {
  public class KeepsRepository {
    private readonly IDbConnection _db;

    public KeepsRepository (IDbConnection db) {
      _db = db;
    }

    public IEnumerable<Keep> GetAllPublic () {
      try {
        return _db.Query<Keep> ("SELECT * FROM keeps WHERE isPrivate = 0");
      } catch {
        return null;
      }
    }

    public IEnumerable<Keep> GetAllForUser (string userId) {
      try {
        return _db.Query<Keep> ("SELECT * FROM keeps WHERE userId = @userId", new { userId });

      } catch {
        return null;
      }
    }

    public Keep NewKeep (Keep newKeep) {
      var madeKeep = _db.Execute ("INSERT INTO keeps (name,description,userId,img,isPrivate,contentUrl,tags) values(@Name, @Description, @UserId, @Img, @IsPrivate,@ContentUrl,@Tags)", newKeep);

      return madeKeep > 0 ? newKeep : null;
    }

    public Keep EditKeep (Keep keep) {
      var editKeep = _db.Execute ("UPDATE keeps SET id = @Id, name = @Name,description = @Description, userId = @UserId, img = @Img, isPrivate = @IsPrivate, views = @Views, shares = @Shares, keeps = @Keeps, contentUrl = @ContentUrl, tags = @Tags WHERE id = @Id", keep);

      return editKeep > 0 ? keep : null;
    }

    public bool DeleteKeep (int id) {
      return _db.Execute ("DELETE FROM keeps WHERE id = @id", new { id }) > 0;
    }
  }
}