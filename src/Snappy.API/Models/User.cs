using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Snappy.API.Models;

public class User : BaseEntity
{
    [Required, JsonIgnore]
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [Required]
    public string Username { get; set; }
    [Required, JsonIgnore, GraphQLIgnore]
    public string Password { get; set; }
    [Required, JsonIgnore, GraphQLIgnore]
    public string Salt { get; set; }
    // [Required] // TODO: reactivate this when encryption is implemented
    public string PublicKey { get; set; }
    public string TwoFactorKey { get; set; }
    [Required]
    public Boolean Active { get; set; }

    // Token Relationship
    [JsonIgnore]
    public List<AuthToken> Tokens { get; set; }
}