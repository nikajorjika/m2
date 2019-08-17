/* eslint-disable prettier/prettier */
export const state = () => ({
    itemList: [
        {
            id: 1,
            title: 'მაცივარი',
            text:
                'შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს',
            image: 'https://via.placeholder.com/300x215',
            feature: 'ტექნიკის ფერი: ლურჯი'
        },
        {
            id: 2,
            title: 'მაგიდა',
            text:
                'შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს',
            image: 'https://via.placeholder.com/300x215',
            feature: 'ტექნიკის ფერი: ლურჯი'
        },
        {
            id: 3,
            title: 'კარადა',
            text:
                'შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის მოყენება',
            image: 'https://via.placeholder.com/300x215',
            feature: 'ტექნიკის ფერი: ლურჯი'
        }
    ]
});

export const getters = {
    itemList: (state) => {
        return state.itemList;
    }
}

export const mutations = {

}

export const actions = {}
