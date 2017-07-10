import _repl from 'repl'

const repl = _repl.start({
  prompt: '',
  input: process.stdin,
  output: process.stdout,
})

export function destroy() {
  process.exit(0)
}

export function log(...messages) {
  repl.write(`${messages}`)
  repl.clearLine()
}
