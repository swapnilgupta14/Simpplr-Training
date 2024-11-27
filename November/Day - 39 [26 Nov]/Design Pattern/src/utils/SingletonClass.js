class SingletonClass {
  constructor() {
    if (SingletonClass.instance) {
      console.log("Existing instance returned");
      return SingletonClass.instance;
    }
    
    this.data = "Initial Singleton Data";
    SingletonClass.instanceCount = (SingletonClass.instanceCount || 0) + 1;
    
    SingletonClass.instance = this;
    console.log("First instance created");
  }

  getData() {
    return this.data;
  }

  setData(newData) {
    this.data = newData;
  }

  static getInstanceCount() {
    return this.instanceCount || 0;
  }
}