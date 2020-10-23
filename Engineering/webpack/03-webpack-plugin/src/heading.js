import './heading.css'

console.log(123);

export default () => {
  const element = document.createElement('h2')

  element.textContent = 'Hello world'
  element.classList.add('heading')
  element.addEventListener('click', () => {
    alert('Hello webpack')
  })

  return element
}
