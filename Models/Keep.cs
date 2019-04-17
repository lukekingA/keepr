using System.ComponentModel.DataAnnotations;

namespace keepr.Models {
  public class Keep {
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string UserId { get; set; }

    public string Img { get; set; }

    [Required]
    public bool IsPrivate { get; set; }

    public int Views { get; set; }

    public int Shares { get; set; }

    public int Keeps { get; set; }
    public string ContentUrl { get; set; }
    public string Tags { get; set; }

  }
}