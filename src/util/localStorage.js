export default class LocalStorage {
  static removeItems(obj = {}) {
    Object.keys(obj).map((name) => {
      localStorage.removeItem(obj[name]);
    });
  }

  static setItems(obj = {}) {
    Object.keys(obj).map((name) => {
      localStorage.setItem(name, obj[name]);
    });
  }

  static getItems(obj = {}) {
    const result = {};

    Object.keys(obj).map((name) => {
      const value = localStorage.getItem(obj[name]);

      if (!value) {
        throw new Error(`There is no value associated with the ${obj[name]}`);
      }

      result[obj[name]] = value;
    });

    return result;
  }
}
