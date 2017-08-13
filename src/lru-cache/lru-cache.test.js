import LruCache from './lru-cache'

test('removes the last read once the max is reached', () => {
  const lruCache = new LruCache({ max: 5 })
  lruCache.set('foo', 1)
  lruCache.set('bar', 1)
  lruCache.set('baz', 1)
  lruCache.set('qux', 1)
  lruCache.set('quux', 1)
  lruCache.set('quuux', 1)
  expect(lruCache.getLength()).toEqual(5)
  expect(lruCache.get('foo')).toEqual(undefined)
  expect(lruCache.get('bar')).toEqual(1)
})

test(`get's affect caching`, () => {
  const lruCache = new LruCache({ max: 2 })
  lruCache.set('foo', 1)
  lruCache.set('bar', 1)
  lruCache.get('foo')
  lruCache.set('baz', 1)
  expect(lruCache.get('foo')).toEqual(1)
  expect(lruCache.get('bar')).toEqual(undefined)
  expect(lruCache.get('baz')).toEqual(1)
})

test(`empties upon reset`, () => {
  const lruCache = new LruCache({ max: 3 })
  lruCache.set('foo', 1)
  lruCache.set('bar', 1)
  lruCache.set('baz', 1)
  lruCache.reset()
  expect(lruCache.getLength()).toEqual(0)
})
