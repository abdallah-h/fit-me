using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class CartController : BaseApiController {
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;
        public CartController(ICartRepository cartRepository, IMapper mapper) {
            _mapper = mapper;
            _cartRepository = cartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Cart>> GetBasketById(string id) {
            var cart = await _cartRepository.GetCartAsync(id);

            return Ok(cart ?? new Cart(id));
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> UpdateBasket(CartDto cartDto) {
            var cart = _mapper.Map<CartDto, Cart>(cartDto);
            var updatedCart = await _cartRepository.UpdateCartAsync(cart);

            return Ok(updatedCart);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id) {
            await _cartRepository.DeleteCartAsync(id);
        }
    }
}