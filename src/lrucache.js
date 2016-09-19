

class LRUCache {


  constructor(maxSize) {
    this.maxSize = maxSize || 100;
    this.size = 0;
    this.values = {};
  }


  get(key) {
    const value = this.values[key];
    value.refCount++;
    return value.value;
  }


  contains(key) {
    return key in this.values;
  }

  remove(key) {
    const value = this.values[key];
    delete this.values[key];
    this.size--;
    return value.value;
  }

  set(key, value) {
    const newValue = {
      refCount: 0,
      value,
    };
    this.values[key] = newValue;
    this.size++;
  }

  values() {
    return this.values;
  }

  length() {
    return this.size;
  }

  getSet(key, value) {
    if (!this.contains(key)) {
      this.set(key, typeof value == 'function' ? value() : value);
    }

    return this.get(key).value;
  }

  release(key) {
    return --this.values[key].refCount;
  }
}

export default LRUCache;
