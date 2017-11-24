export function generateEnumObject() {
  let outputObject = {}
  for (let i=0; i<arguments.length; i++) {
    for (let j=0; j<arguments[i].length; j++) {
      outputObject[arguments[i][j]] = arguments[i][j]
    }
  }
  return outputObject
}
