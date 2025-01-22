import { Product, products } from "../../data/products.js";
  describe('Test Suite: Product Class', () => {
    let shoes;
    beforeEach(() => {
      shoes = new Product(
        {
          id: '1',
          image: 'test',
          name: 'shoes',
          rating: {
            stars: 4.4,
            count: 85
          },
          priceCents: 1200,
        }
      )
    }); 

    it('allows use to methods', () => {
      expect(shoes.getPrice()).toEqual('$12.00');
    })
    it('has the correct properties', () => {
      expect(shoes.id).toEqual('1');
      expect(shoes.image).toEqual('test');
      expect(shoes.rating).toEqual({
        stars: 4.4,
        count: 85
      });
      expect(shoes.name).toEqual('shoes');
      expect(shoes.priceCents).toEqual(1200);
    });
  });

