const { Shop, Item } = require('../src/gilded_rose.js');

const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert'

describe("Gilded Rose", function () {

  //TEST 1 
  it("adds item foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  //TEST 2 
  it("item quality drops by 2 once its past sell in", function () {
    const gildedRose = new Shop([new Item("foo", -2, 5)]);
    const degradeQualtiy = gildedRose.updateQuality();

    const expected = degradeQualtiy[0].quality
    expect(expected).toEqual(3);
  });

  //TEST 3
  it("quality never goes down to a negative number", function () {
    const gildedRose = new Shop([new Item("foo", 5, 0)]);
    const negativeQuality = gildedRose.updateQuality();

    const expected = negativeQuality[0].quality
    expect(expected).toEqual(0);
  });

  //Test 4

  it("Aged Brie quality increase by 2 as it gets past sell in", function () {
    const gildedRose = new Shop([new Item('Aged Brie', -12, 5)]);
    const qualityIncrease = gildedRose.updateQuality();

    const expected = qualityIncrease[0].quality
    expect(expected).toEqual(7);
  });

  //TEST 5
  it("item quality never over 50", function () {
    const gildedRose = new Shop([new Item('Aged Brie', -12, 50)]);
    const quality = gildedRose.updateQuality();

    const expected = quality[0].quality
    expect(expected).toEqual(50);
  });

  //TEST 6
  it("legendary item sell in date does not drop", function () {
    const gildedRose = new Shop([new Item(SULFURAS, 0, 80)]);
    const legendarySellIn = gildedRose.updateQuality();

    const expected = legendarySellIn[0].sellIn
    expect(expected).toEqual(0);
  });
   
//TEST 7
  it("legendary item quality does not drop", function () {
    const gildedRose = new Shop([new Item(SULFURAS, 0, 80)]);
    const legendaryQuality = gildedRose.updateQuality();

    const expected = legendaryQuality[0].quality
    expect(expected).toEqual(80);
  });

  //TEST 8
  it("backstage pass quality increases by 2 when 10 or less sell in left", function () {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 9, 40)]);
    const backstagePass = gildedRose.updateQuality();

    const expected = backstagePass[0].quality
    expect(expected).toEqual(42);
  });

  //TEST 9
  it("backstage pass quality increases by 3 when 5 or less sell in left", function () {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 5, 40)]);
    const backstagePass = gildedRose.updateQuality();

    const expected = backstagePass[0].quality
    expect(expected).toEqual(43);
  });

   //TEST 9
   it("backstage pass quality drops to 0 once its past sell in", function () {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 0, 40)]);
    const backstagePass = gildedRose.updateQuality();

    const expected = backstagePass[0].quality
    expect(expected).toEqual(0);
  });




});
