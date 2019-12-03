export default function ({ app, store }) {
  if(process.client) {
    const questions = store.getters['FAQ/questionList']
    if(!questions.length) {
      store.dispatch('FAQ/fetchFAQ').then(response => {
        // console.log(response)
      }).catch(error => console.log(error))
    }
  }
}