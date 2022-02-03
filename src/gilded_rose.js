const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert'
const AGED_BRIE = 'Aged Brie'
const CONJURED_MANA_CAKE = 'Conjured Mana Cake'
const MAX_QUALIITY = 50


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
       // reduces sell in for all items that isnt SULFURAS
      this.reduceSellIn()
      if (this.isntUniqueItems() && items.quality > 0) {
        items.quality--
      }
      else if (items.quality < MAX_QUALIITY) {
        items.quality++
        // handels sell in & quality requirements for Backstage Pass.
        this.backstagePassQuality()
      }

     
      
      if (items.sellIn < 0) {
        if (items.name != AGED_BRIE) {
          if (items.quality > 0) {
            if (items.name != SULFURAS) {
              items.quality--
            }
          }

        }
        else if (items.quality < MAX_QUALIITY) {
          items.quality++
        }

      }


    }
    console.log(this.items)
    return this.items
  }

  reduceSellIn() {
    for (const items of this.items) {
      if (items.name != SULFURAS) { items.sellIn-- }
    }
  }

  isntUniqueItems() {
    for (const items of this.items) {
      if (items.name != AGED_BRIE && items.name != BACKSTAGE_PASS && items.name != SULFURAS) {
        return true
      }
    }
  }

  backstagePassQuality() {
    for (const items of this.items) {
      if (items.name === BACKSTAGE_PASS) {
        if (items.sellIn <= 10 && items.quality < MAX_QUALIITY) {
          items.quality++
        }
        if (items.sellIn <= 5 && items.quality < MAX_QUALIITY) {
          items.quality++
        }
        if (items.sellIn <= 0 && items.quality < MAX_QUALIITY) {
          items.quality = items.quality - items.quality
        }
      }
    }
  }


}
module.exports = {
  Item,
  Shop
}
