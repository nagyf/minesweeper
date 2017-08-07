import {Minefield} from "./minefield";

describe('minefield', function () {
  describe('constructor', function () {
    it('should initialize an empty field with bombs in random positions', function () {
      const minefield = new Minefield(10, 10, 10);
      console.log(minefield.toString());
    });
  });

  describe('around', function () {
    it('should return every coordinates around a coordinate', function () {
      const minefield = new Minefield(10, 10, 10);
      expect(minefield.around(4, 4).length).toBe(8);
      expect(minefield.around(0, 0).length).toBe(3);
    });
  });
});
