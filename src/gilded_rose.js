const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert'
const AGED_BRIE = 'Aged Brie'


class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (const items of this.items) {

      if (this.checkUniqueItems()) {
        if (items.quality > 0) {
          items.quality = items.quality - 1;
        }

      } else if (items.quality < 50) {
        items.quality = items.quality + 1;
        if (items.name == BACKSTAGE_PASS) {
          if (items.sellIn < 11) {
            if (items.quality < 50) {
              items.quality = items.quality + 1;
            }
          }
          if (items.sellIn < 6) {
            if (items.quality < 50) {
              items.quality = items.quality + 1;
            }
          }
        }
      }

      if (items.name != SULFURAS) {
        items.sellIn = items.sellIn - 1;
      }
      if (items.sellIn < 0) {
        if (items.name != AGED_BRIE) {
          if (items.name != BACKSTAGE_PASS) {
            if (items.quality > 0) {
              if (items.name != SULFURAS) {
                items.quality = items.quality - 1;
              }
            }
          } else {
            items.quality = items.quality - items.quality;
          }
        } else {
          if (items.quality < 50) {
            items.quality = items.quality + 1;
          }
        }
      }
    }
    console.log(this.items)
    return this.items;
  }


  checkUniqueItems() {
    for (const items of this.items) {
      if (items.name != AGED_BRIE && items.name != BACKSTAGE_PASS && items.name != SULFURAS) {
        return true
      }
    }
  }


}
module.exports = {
  Item,
  Shop
}
