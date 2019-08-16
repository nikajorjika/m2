<template>
  <div class="container">
    <Slider />
    <PageDesc :static-title="static_title" :title="title" :text="text" />
  </div>
</template>

<script>
import PageDesc from '@/components/core/PageDesc'
import Slider from '@/components/core/Slider'
export default {
  components: {
    PageDesc,
    Slider
  },
  asyncData() {
    return {
      static_title: 'რეპლიკაციაზე წარმოდგენილი ავეჯი',
      title: 'ჯინჯერი',
      text:
        'შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს, რეალურთან მაქსიმალურად მიახლოებული შაბლონი წარუდგინონ შემფასებელს. ხშირადაა შემთხვევა, როდესაც დიზაინის შესრულებისას საჩვენებელია, თუ როგორი იქნება ტექსტის ბლოკი. სწორედ ასეთ დროს არის მოსახერხებელი ამ გენერატორით შექმნილი ტექსტის გამოყენება, რადგან უბრალოდ „ტექსტი ტექსტი ტექსტი“ ან სხვა გამეორებადი სიტყვების ჩაყრა, ხელოვნურ ვიზუალურ სიმეტრიას ქმნის და არაბუნებრივად გამოიყურება.'
    }
  }
}
</script>
