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

console.log('Main app version', appPackage.name, ':', appPackage.version)
console.log('Plugin version', pluginPackage.name, ':', pluginPackage.version)

// Ignored packages due to relative path instead of versions
const ignoredDependencies = ['@regardsoss/webpack-config-front']

/**
 * Checks that dependency has same version than main app
 * @param {string} dependency dependency key, from plugin dependencies
 * @return {key, pluginVersion, appVersion} report for key if invalid, null otherwise
 */
function matchWithMainApp(dependencyKey, dependencyVersion) {
  if (ignoredDependencies.includes(dependencyKey)) {
    return null // ignored package
  }
  const appDependencyVersion = appPackage.dependencies[dependencyKey] || appPackage.devDependencies[dependencyKey]
  if (appDependencyVersion !== dependencyVersion) {
    return {
      key: dependencyKey,
      pluginVersion: dependencyVersion,
      appVersion: appDependencyVersion,
    }
  }
  return null
}

const nonMatchingDependencies = Object.keys(pluginPackage.dependencies)
  .map(k => matchWithMainApp(k, pluginPackage.dependencies[k]))
  .filter(r => !!r)// remove null reports
const nonMatchingDevDependencies = Object.keys(pluginPackage.devDependencies)
  .map(k => matchWithMainApp(k, pluginPackage.devDependencies[k]))
  .filter(r => !!r)

function toPackageJSONPart(depReports) {
  return depReports.map(dependencyReport => `"${dependencyReport.key}": "${dependencyReport.appVersion}"`).join(',\n')
}

if (nonMatchingDependencies.length) {
  console.error('==================================================')
  console.error('There following dependencies should be upgraded:')
  console.error('==================================================')
  console.error(toPackageJSONPart(nonMatchingDependencies))
}
if (nonMatchingDevDependencies.length) {
  console.error('==================================================')
  console.error('There following devDependencies should be upgraded:')
  console.error('==================================================')
  console.error(toPackageJSONPart(nonMatchingDevDependencies))
}
if (nonMatchingDependencies.length || nonMatchingDevDependencies.length) {
  process.exit(1)
}
