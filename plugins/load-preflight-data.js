export default function({ app, $axios, store }) {
  if (process.client) {
    const questions = store.getters['FAQ/questionList']
    if (!questions.length) {
      store.dispatch('FAQ/fetchFAQ')
    }

    const blocks = store.getters['Filter/blocks']
    if (!blocks.length) {
      $axios.get('/blocks').then(({ data }) => {
        store.commit('Filter/SET', {
          key: 'blocks',
          value: data.blocks
        })
      })
    }
  }
}
