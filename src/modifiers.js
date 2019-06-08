export default [
  {
    // Gros texte
    condition: word => word[0] === '*',
    modify: word => ({ class: 'hero', text: word.substr(1) })
  },
  {
    // Gros texte en outline
    condition: word => word[0] === '@',
    modify: word => ({ class: 'outline', text: word.substr(1) })
  },
  {
    // Petit texte
    condition: word => word[0] === '-',
    modify: word => ({ class: 'small', text: word.substr(1) })
  },
  {
    // Texte barré
    condition: word => word[0] === '~',
    modify: word => ({ class: 'nope', text: word.substr(1) })
  },
  {
    // Pour faire des slides vides ou échapper un des caractères précédents
    condition: word => word[0] === '.',
    modify: word => ({ class: '', text: word.substr(1) })
  },
  {
    // Par défaut
    condition: word => true,
    modify: word => ({ class: '', text: word })
  },
]
