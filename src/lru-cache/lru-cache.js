export default class LruCache {
  constructor(opts) {
    this.max = opts.max
    this.cache = []
  }

  get(key) {
    const match = this.cache.find(c => c.key === key)
    if (!match) {
      return
    }
    const position = this.cache.indexOf(match)
    this.cache.push(this.cache.splice(position, 1)[0])
    return match.value
  }

  getLength() {
    return this.cache.length
  }

  set(key, value) {
    if (this.cache.length === this.max) {
      this.cache.shift()
    }
    this.cache.push({ key, value })
  }

  reset() {
    this.cache = []
  }
}
