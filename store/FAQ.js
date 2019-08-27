export const state = () => ({
  questionList: []
})

export const getters = {
  questionList: (state) => state.questionList
}

export const mutations = {
  SET_QUESTION_LIST: (state, data) => {
    state.questionList = data
  },
  MAP_FETCHED_TO_STATE: (state, { data }) => {
    state.questionList = data.map((item) => {
      return {
        title: item.question,
        content: item.answer
      }
    })
  }
}

export const actions = {
  fetchFAQ(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/faqs')
        .then(({ data }) => {
          context.commit('MAP_FETCHED_TO_STATE', data)
          resolve(data)
        })
        .catch((e) => reject(e))
    })
  }
}
