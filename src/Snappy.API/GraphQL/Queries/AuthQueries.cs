using Snappy.API.Services;
using HotChocolate.AspNetCore.Authorization;
using Snappy.API.Models;

namespace Snappy.API.GraphQL.Queries
{
    [ExtendObjectType("Query")]
    public class AuthQueries
    {
        [Authorize]
        public User WhoAmI([Service] IIdentityService idService)
        {
            return idService.CurrentUser;
        }
    }
}