const cpus = require('os').cpus()

let cpu = cpus ? cpus.length - 1 : 1

if (process.env.NB_THREAD) {
  cpu = parseInt(process.env.NB_THREAD, 10)
}
if (cpu > 4) {
  cpu = 4
}

module.exports = cpu
