let relScrollLerp = 0
let oldCharging = 0
let oldScroll = 0

const colors = {
  bg: [{r: 60, g: 0, b: 200}, {r: 200, g: 0, b: 60}],
  fg: [{r: 255, g: 100, b: 160}, {r: 255, g: 260, b: 0}]
}

export default function check(config, elems, currentSlideIndex) {
  updateDom(currentSlideIndex, elems, config)

  const oldRelScrollLerp = relScrollLerp
  const relScroll = window.scrollY / (elems.length * config.threshold)
  relScrollLerp = lerp(oldRelScrollLerp, (currentSlideIndex === 0 || currentSlideIndex === elems.length-1) ? .5 : relScroll, .1)

  config.el.style.transform = `translate3d(0, ${relScrollLerp - (relScrollLerp - 0.5) * window.innerHeight * 0.7}px, 0)`
  
  const charging = lerp(oldCharging, relScroll, .1)
  document.querySelector('#charging').style.width = `${charging * 100}vw`
  oldCharging = charging

  const bg = lerpColor(colors.bg[0], colors.bg[1], charging)
  const fg = lerpColor(colors.fg[0], colors.fg[1], charging)

  document.body.style.backgroundColor = `rgb(${bg.r}, ${bg.g}, ${bg.b})`
  document.querySelector('#charging').style.backgroundColor = `rgb(${fg.r}, ${fg.g}, ${fg.b})`
  config.el.style.color = `rgb(${fg.r}, ${fg.g}, ${fg.b})`

  if (window.scrollY > (currentSlideIndex + 1) * config.threshold) {
    currentSlideIndex ++
    updateDom(currentSlideIndex, elems, config)
  } else if (window.scrollY < currentSlideIndex * config.threshold) {
    currentSlideIndex --
    updateDom(currentSlideIndex, elems, config)
  }
  window.requestAnimationFrame(() => check(config, elems, currentSlideIndex))
}

function updateDom (slideIndex, elems, config) {
  if (oldScroll !== window.scrollY) {
    const elem = elems[slideIndex]
    if (!elem) return
    if (elem.url) {
      const a = document.createElement('a')
      a.setAttribute('href', elem.url)
      a.setAttribute('target', '_blank')
      a.textContent = elem.text
      config.el.textContent = ''
      config.el.append(a)
    } else {
      config.el.textContent = elem.text
    }
    if (elem.class) config.el.className = elem.class
    else config.el.className = ''
  }
  oldScroll = window.scrollY
}

function lerp(val1, val2, t) {
  return val1 + ((val2 - val1) * t)
}

function lerpColor(color1, color2, t) {
  let color = {}
  color.r = lerp(color1.r, color2.r, t)
  color.g = lerp(color1.g, color2.g, t)
  color.b = lerp(color1.b, color2.b, t)
  return color
}