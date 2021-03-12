const FILE_EXTENSION_PATTERN = /^.+\.(?<extension>[a-zA-Z]+)$/

export function getExtension(file) {
  const { groups: { extension } } = file.name.toLowerCase().match(FILE_EXTENSION_PATTERN)
  return extension
}
