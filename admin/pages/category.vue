<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new category</h2>
          <form>
            <div class="a-spacing-top-medium">
              <label>Type</label>
              <input type="text" class="a-input-text" style="width: 100%" v-model="type">
            </div>

            <!-- button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddCategory">Add category</span>
                  </span>
                </span>
              </div>
          </form>

          <br />
          <ul v-for="category in categories" :key="category._id" class="list-group-item">
            <li>{{ category.type }}</li>
          </ul>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('http://localhost:3000/api/categories');

      return {
        categories: response.categories,
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      type: '',
    };
  },

  methods: {
    async  onAddCategory() {
      try {
        const data = { type: this.type };

        const response = await this.$axios.$post('http://localhost:3000/api/categories', data);

        this.categories.push(data);
      } catch (err) {
        console.log(err);
      }
    },

  },
};
</script>
