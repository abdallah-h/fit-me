using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data {
    public class CartReopsitory : ICartRepository {
        private readonly IDatabase database;
        public CartReopsitory(IConnectionMultiplexer redis) {
            database = redis.GetDatabase();
        }

        public async Task<bool> DeleteCartAsync(string cartId) {
            return await database.KeyDeleteAsync(cartId);
        }

        public async Task<Cart> GetCartAsync(string cartId) {
            var data = await database.StringGetAsync(cartId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<Cart>(data);
        }

        public async Task<Cart> UpdateCartAsync(Cart cart) {
            var created = await database.StringSetAsync(cart.Id,
                JsonSerializer.Serialize(cart), TimeSpan.FromDays(30));

            if (!created)return null;

            return await GetCartAsync(cart.Id);
        }
    }
}