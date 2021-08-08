export function utf16to8(str) {
  var out, i, len, c
  out = ""
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x0001 && c <= 0x007f) {
      out += str.charAt(i)
    } else if (c > 0x07ff) {
      out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
    } else {
      out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
    }
  }
  return out
}

export function safe64(base64) {
  base64 = base64.replace(/\+/g, "-")
  base64 = base64.replace(/\//g, "_")
  return base64
}

export function stringPresent(str) {
  return typeof str === "string" && str.length > 0
}

export function isDescendant(parent, child) {
  var node = child.parentNode
  while (node != null) {
    if (node == parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const IconLink =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAZlBMVEUAAAAAgO8AgP8Ah/cAhfQAhfoAivQAivoAg/MAg/cAh/MAh/cAg/UAhvUAh/YAh/gAhvYAhvgAhvcAhfUAh/cAh/gAhvYAh/cAh/kAh/UAh/YAh/cAhvgAh/YAh/cAh/YAh/gAh/erq/hfAAAAIXRSTlMAEBAgMDAwMEBAQEBQUG9vcHB/gICPkJ+foK+/z8/f7+/3XkZ+AAAAo0lEQVR42lXPhY3EMBRFUW+Ymfn23+Q60RuyyDqfzfdzvMj9AUvNCYxi2Qb7Cse3bhypMe7O+jFfKX8nzkdT/XcSSVS0mXqtQmcBOKr774KjuefQrmDVPRhkdoZjarrbNudtjU1z3mb622waazudsj+wZvUAmB8zMbrAzdsyMEa46/ZI8pRfzpN4EH50ZXPtSQebQCmsG5r71hk4u4+J0+CH/gHqWg6JhPTq4gAAAABJRU5ErkJggg=="

export const IconMarkdown =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAASFBMVEUAAAAAgP8AgPcAh/cAivoAg/cAh/cAhvoAh/QAhvkAhvgAh/YAhfYAhvYAh/cAh/YAh/gAh/cAhvgAh/YAh/cAh/YAh/gAh/f/BCSbAAAAF3RSTlMAECAgMEBAX2B/j4+QkJ+vr7/Pz9/v72gNOg0AAABoSURBVHjapcoFFsMgEADRiVAXnPufFKt385RJsP+W0WYR6CQypI0aGlO3YFy7uid6uCa/cGhX9UHMjn9cmOr3h+rMcqm4p3Z/YTr5W5tc4fierJeOcWnWMBpbL974tqcnyjDSNCwiBivoXBEOV0ymhQAAAABJRU5ErkJggg=="
