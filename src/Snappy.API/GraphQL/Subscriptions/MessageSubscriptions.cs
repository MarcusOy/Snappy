using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Snappy.API.Data;
using Snappy.API.Models;
using Snappy.API.Services;

namespace Snappy.API.GraphQL.Subscriptions
{
    [ExtendObjectType("Subscription")]
    public class MessageSubscriptions
    {
        [Subscribe(With = nameof(SubscribeOnConversationUpdateAsync)), Topic]
        public async Task<List<Message>> OnConversationUpdate(
            [EventMessage] Guid[] changedMessageIds,
            [Service] IIdentityService idService,
            [Service] SnappyDBContext dbContext
        )
        {
            return await dbContext.Messages
                .Where(m => m.SenderId == idService.CurrentUser.Id
                       || m.ReceiverId == idService.CurrentUser.Id)
                .Where(s => changedMessageIds.Contains(s.Id))
                .Include(s => s.Sender)
                .Include(s => s.Receiver)
                .ToListAsync();
        }
        [Authorize]
        public async ValueTask<ISourceStream<Guid[]>> SubscribeOnConversationUpdateAsync(
            [Service] ISubscriptionService subService,
            CancellationToken cancellationToken
        )
        {
            return await subService.SubscribeAsync<Guid[]>(SubscriptionTopic.OnConversationUpdate, cancellationToken);
        }
    }
}