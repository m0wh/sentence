import './style.scss'
import Sentence from './Sentence'
import check from './check.js'

const config = {
  threshold: 400,
  el: document.querySelector('#slide')
}

const sentence = new Sentence('-Scroll_now *Malo *Widerspach is a young @creative @developer from Lyon, France, currently having fun (https://achos.xxx)@at_achos! in_Barcelona. .:) You can check out his design work on (https://behance.net/mowh)Behance, and discover his past and current dev projects on (https://github.com/m0wh)GitHub. .... Feel free to *(https://twitter.com/mowhtr)say_hello.')
const elems = sentence.parse()

document.body.style.height = `${elems.length * config.threshold}px`

let currentSlideIndex = 0

check(config, elems, currentSlideIndex)