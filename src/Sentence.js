import modifiers from './modifiers'

class Word {
  constructor (raw) { this.raw = raw }

  parse () {
    let raw = this.raw
    let url
    
    // check if has url
    const hasUrl = this.raw.match(/\((.*)\)(.+)/i)
    if (hasUrl) {
      url = hasUrl[1]
      raw = hasUrl[2]
    }
    
    const withSpaces = raw.replace(/_/g, ' ').trim()
    
    let slide = { }
    for (let modifier of modifiers) {
      if (modifier.condition(withSpaces)) {
        slide = modifier.modify(withSpaces) // apply a class
        break
      }
    }
    
    if (hasUrl) slide.url = url
    return slide
  }
}

export default class Sentence {
  constructor (sentence) { this.sentence = sentence }

  parse () {
    const words = this.sentence.split(' ').map(word => new Word(word)) // sépare les mots
    const slides = words.map(word => word.parse())
    return slides
  }
}