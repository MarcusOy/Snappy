using System.Threading;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Snappy.API.Models;
using Snappy.API.Services;

namespace Snappy.API.GraphQL.Mutations
{
    [ExtendObjectType("Mutation")]

    public class MessageMutations
    {
        [Authorize]
        public async Task<Message> SendMessage(
            Message message,
            Guid sendToUserId,
            [Service] IMessageService messageService)
        {
            var m = await messageService.SendAsync(message, sendToUserId);
            return m;
        }
        [Authorize]
        public async Task<Message> DeleteAllMessages(
            Guid userId,
            [Service] IMessageService messageService,
            [Service] ISubscriptionService subService)
        {
            await Task.Run(() => Thread.Sleep(1000));
            return new Message();
            // var clips = await dbContext.Clips
            //     .Where(s => s.DeletedOn == null)
            //     .Where(s => s.OwnerUserId == idService.CurrentUser.Id)
            //     .Where(s => clipIds.Contains(s.Id))
            //     .ToListAsync();

            // if (clips.Count == 0)
            //     throw new InvalidDataException("Clip not found.");

            // foreach (Clip c in clips)
            //     c.DeletedOn = DateTime.UtcNow;

            // dbContext.Clips.UpdateRange(clips);
            // await dbContext.SaveChangesAsync();

            // await subService.NotifyAsync(SubscriptionTopic.OnMessagesUpdate, clips.Select(s => s.Id).ToArray());

            // return clips;
        }
    }
}