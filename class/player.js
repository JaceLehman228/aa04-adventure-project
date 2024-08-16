const { Food } = require('./food');
const { Item } = require('./item');
const { Room } = require('./room');

class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;
      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
          console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Picks up an item from the current room into the player's inventory
    let item = this.currentRoom.getItemByName(itemName);
    let itemInd = this.currentRoom.items.indexOf(item);
    //console.log(this.currentRoom.items.splice(itemInd));
    this.items.push(...this.currentRoom.items.splice(itemInd));
    return this.items;
  }  

  dropItem(itemName) {
    // Drops an item the player is holding into their current room
    let item = this.getItemByName(itemName);
    let itemInd = this.items.indexOf(item);
    this.currentRoom.items.push(...this.items.splice(itemInd));
    return this.items;
  }

  eatItem(itemName) {
    // Allow the player to eat food items, but not non-food items
    let item = this.getItemByName(itemName);
    if(item instanceof Food) {
      this.items.splice(this.items.indexOf(item));
    }
  }

  getItemByName(name) {
    // Retrieves an item from a player's inventory by item name
    return this.items.find(item => item.name == name);
  }
}

// let room = new Room("Test Room", "A test room");
// let item = new Item("rock", "just a simple rock");
// let item2 = new Item('Dirt', 'From the ground')
// room.items.push(item);
// room.items.push(item2)
// let player = new Player("player", room);
// player.takeItem("rock")
// console.log(player.takeItem('Dirt'));



module.exports = {
  Player
};
