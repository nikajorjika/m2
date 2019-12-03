export default function ({ app, $axios, store }) {
  if(process.client) {
    const questions = store.getters['FAQ/questionList']
    if(!questions.length) {
      store.dispatch('FAQ/fetchFAQ')
        .catch(error => console.log(error))
    }

    const blocks = store.getters['Filter/blocks']
    if(!blocks.length) {
      $axios.get('/blocks').then(({data}) => {
        store.commit('Filter/SET', {
          key: 'blocks',
          value: data.blocks
        })
      }).catch(error => console.log(error))
    }
  }
}