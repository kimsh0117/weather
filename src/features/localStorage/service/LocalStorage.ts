class LocalStorage  {
  private static _instance: LocalStorage;

  public static getInstance() {
    if(!LocalStorage._instance) {
      LocalStorage._instance = new LocalStorage()
    }
    return LocalStorage._instance;
  }

  isSupport(): boolean {
    return typeof (Storage) !== "undefined";
  }
  getItem<T>(key: string): T  | undefined {
    if(!this.isSupport()) {
      throw Error('this browser not support localStorage');
    }
    const item = localStorage.getItem(key)

    if (item === null) return

    if (item === "null") return
    if (item === "undefined") return

    try {
      return JSON.parse(item)
    } catch {
      throw Error('doent parse storage object')
    }
  }

  setItem<T>(key: string, value: T): void {
    if (value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
}

export default LocalStorage