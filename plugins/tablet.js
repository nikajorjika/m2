export default function ({app}) {
  const id = app.$cookies.get('paveleon-planshet')
  if(!id) {
    const inputId = window.prompt("გთხოვთ ჩაწეროთ პლანშეტის ნომერი")
    app.$cookies.set('paveleon-planshet', inputId)
  }
}