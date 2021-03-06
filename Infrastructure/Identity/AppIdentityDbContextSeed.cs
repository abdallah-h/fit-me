using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity {
    public class AppIdentityDbContextSeed {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager) {
            if (!userManager.Users.Any()) {
                var user = new AppUser {
                    DisplayName = "Abdoh",
                    Email = "abdallah@gmail.com",
                    UserName = "abdallah@gmail.com",
                    Address = new Address {
                    FirstName = "abdallah",
                    LastName = "Hassan",
                    Street = "Rizk",
                    City = "Cairo",
                    State = "Cairo",
                    Zipcode = "11111"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}