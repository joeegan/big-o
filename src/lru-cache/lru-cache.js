export default class LruCache {
  constructor(opts = {}) {
    this.max = opts.max || Infinity
    this.cache = []
  }

  get(key) {
    const match = this._getMatch(key)
    if (!match) {
      return
    }
    const position = this.cache.indexOf(match)
    this.cache.push(this.cache.splice(position, 1)[0])
    return match.value
  }

  set(key, value) {
    if (this.cache.length === this.max) {
      this.cache.shift()
    }
    this.cache.push({ key, value })
  }

  keys() {
    return this.cache.map(c => c.key)
  }

  values() {
    return this.cache.map(c => c.value)
  }

  _getMatch(key) {
    return this.cache.find(c => c.key === key)
  }

  peek(key) {
    const match = this._getMatch(key)
    if (!match) {
      return
    }
    return match.value
  }

  del(key) {
    const match = this._getMatch(key)
    const position = this.cache.indexOf(match)
    this.cache.splice(position, 1)
  }

  get length() {
    return this.cache.length
  }

  reset() {
    this.cache = []
  }
}
