#!/usr/bin/env node
const fs = require('fs')


const [, , ...args] = process.argv
if (args.length !== 2) {
  console.error('Incorrect usage of this CLI')
  console.error('compareDependencies.js <path to app package.json file> <path to plugin package.json file>')
  return process.exit(1) // declare the error to the test runner
}

function getJsonContent(path) {
  try {
    const content = fs.readFileSync(path, 'utf8')
    return JSON.parse(content)
  } catch (e) {
    console.error('Failed to read the JSON content :', e)
    return process.exit(1)
  }
}

const appPackage = getJsonContent(args[0])
const pluginPackage = getJsonContent(args[1])

console.log('Main app version', appPackage.version)
console.log('Plugin version', pluginPackage.version)
