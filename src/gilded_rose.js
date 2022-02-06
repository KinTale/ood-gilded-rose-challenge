const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert'
const AGED_BRIE = 'Aged Brie'
const CONJURED_MANA_CAKE = 'Conjured Mana Cake'
const MAX_QUALIITY = 50
const UNIQUE_ITEMS = [SULFURAS, BACKSTAGE_PASS, AGED_BRIE]

class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

class Shop {
  constructor(items = []) {
    this.items = items
  }

  updateQuality() {
    for (const items of this.items) {
      // reduces sell-in for ALL ITEMS that isnt SULFURAS (legendary item).
      this.reduceSellIn(items)

      // checks if item isnt unique, if true & quality over 0, it decrements quality.
      this.qualityAboveZero(items)

      // checks if item isnt unique, if false & quality under 50, it increases quality.
      this.qualityUnderMax(items)

      //Handles expired item quality
      this.expiredSellIn(items)
    }
    console.log(this.items)
    return this.items
  }

  qualityAboveZero(items) {
    if (this.isntUniqueItems(items) && items.quality > 0) {
      items.quality--
      // Checks if its Conjured Mana Cake. If true it further reduces quality by 1.
      // Resulting in quality drop by 2
      this.conjuredManaCake(items)
    }
  }
  qualityUnderMax(items) {
    if (!this.isntUniqueItems(items) && items.quality < MAX_QUALIITY) {
      items.quality++
      // handles sell-in & quality requirements for Backstage Pass.
      this.backstagePassQuality(items)
    }
  }

  expiredSellIn(items) {
    if (items.sellIn < 0) {
      if (items.name != AGED_BRIE) {
        if (items.quality > 0 && items.name != SULFURAS) { items.quality-- }
      }
      else if (items.quality < MAX_QUALIITY) {
        items.quality++
      }
    }
  }

  conjuredManaCake(items) {
    if (items.name === CONJURED_MANA_CAKE) { items.quality-- }
  }

  reduceSellIn(items) {
    if (items.name != SULFURAS) { items.sellIn-- }
  }

  isntUniqueItems(items) {

    if (items.name != AGED_BRIE && items.name != BACKSTAGE_PASS && items.name != SULFURAS) {
      return true
    }
  }

  backstagePassQuality(items) {
    if (items.name === BACKSTAGE_PASS && items.quality < MAX_QUALIITY) {
      if (items.sellIn <= 10) { items.quality++ }
      if (items.sellIn <= 5) { items.quality++ }
      if (items.sellIn <= 0) { items.quality = items.quality - items.quality }
    }
  }


}
module.exports = {
  Item,
  Shop
}
