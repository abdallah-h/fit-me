using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data {
    public class StoreContextSeed {
        // Seed data into database from json files.
        public static async Task SeedAsync(StoreContext storeContext, ILoggerFactory loggerFactory) {
            try {
                if (!storeContext.ProductBrands.Any()) {
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(SeedData("brands"));
                    foreach (var item in brands) {
                        storeContext.ProductBrands.Add(item);
                    }
                    await storeContext.SaveChangesAsync();
                }

                if (!storeContext.ProductTypes.Any()) {
                    var types = JsonSerializer.Deserialize<List<ProductType>>(SeedData("types"));
                    foreach (var item in types) {
                        storeContext.ProductTypes.Add(item);
                    }
                    await storeContext.SaveChangesAsync();
                }

                if (!storeContext.Products.Any()) {
                    var products = JsonSerializer.Deserialize<List<Product>>(SeedData("products"));
                    foreach (var item in products) {
                        storeContext.Products.Add(item);
                    }
                    await storeContext.SaveChangesAsync();
                }

                if (!storeContext.DeliveryMethods.Any()) {
                    var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(SeedData("delivery"));
                    foreach (var item in deliveryMethods) {
                        storeContext.DeliveryMethods.Add(item);
                    }
                    await storeContext.SaveChangesAsync();
                }
            } catch (Exception ex) {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
        private static string SeedData(string file) {
            var data = File.ReadAllText("../Infrastructure/Data/SeedData/" + file + ".json");
            return data;
        }
    }
}