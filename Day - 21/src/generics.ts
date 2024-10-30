interface BaseItem {
  id: string;
  name: string;
}

interface Book extends BaseItem {
  author: string;
  pages: number;
}

interface Clothing extends BaseItem {
  size: string;
  material: string;
}

interface Electronics extends BaseItem {
  brand: string;
  warranty: boolean;
}

// class
class Inventory<T extends BaseItem> {
  private items: T[] = [];

  addItem(item: T): void {
    if (this.findItem(item.id)) {
      throw new Error(`Item with ID ${item.id} already exists in inventory`);
    }
    console.log(`${item.id} Added`);
    this.items.push(item);
  }

  removeItem(id: string): T | undefined {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return undefined;
    }
    return this.items.splice(index, 1)[0];
  }

  findItem(id: string): T | undefined {
    console.log(`\nSeacrching for item with id: ${id}`);
    return this.items.find((item) => item.id === id);
  }

  getItems(): T[] {
    return [...this.items];
  }

  // additional
  getItemCount(): number {
    return this.items.length;
  }

  updateItem(id: string, updatedItem: T): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    updatedItem.id = id;
    this.items[index] = updatedItem;
    return true;
  }
}

const bookInventory = new Inventory<Book>();
bookInventory.addItem({
  id: "B001",
  name: "Book1",
  author: "Author1",
  pages: 180,
});

bookInventory.addItem({
  id: "B002",
  name: "Book2",
  author: "Author2",
  pages: 328,
});

console.log("\nAll Books:", bookInventory.getItems());
console.log("Found Book:", bookInventory.findItem("B001"));

console.log("-------------------");

const clothingInventory = new Inventory<Clothing>();
clothingInventory.addItem({
  id: "C001",
  name: "Cloth1",
  size: "M",
  material: "Cotton",
});

clothingInventory.addItem({
  id: "C002",
  name: "Cloth2",
  size: "L",
  material: "Denim",
});

const removedClothing = clothingInventory.removeItem("C001");
console.log("\nRemoved Clothing Item:", removedClothing);

console.log("\n Updated Clothing Item List:", clothingInventory.getItems());

console.log("-------------------");

const electronicsInventory = new Inventory<Electronics>();
electronicsInventory.addItem({
  id: "E001",
  name: "Smartphone",
  brand: "B1",
  warranty: true,
});

electronicsInventory.addItem({
  id: "E002",
  name: "Laptop",
  brand: "B2",
  warranty: true,
});

const updatedElecItem: Electronics = {
  id: "E001",
  name: "New Name",
  brand: "New Brand",
  warranty: false
};

electronicsInventory.updateItem("E001", updatedElecItem);
console.log("Updated Electronics Item List:", electronicsInventory.getItems());

// ---------------
console.log("-------------------");
console.log("\n\nBook Count:", bookInventory.getItemCount());
console.log("\nClothing Count:", clothingInventory.getItemCount());
console.log("\nElectronics Count:", electronicsInventory.getItemCount());
