<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add new Product</h2>

            <form>
              <!-- category dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryID">
                  <option v-for="category in categories" :key="category._id" :value="category._id">
                    {{ category.type }}
                  </option>
                </select>
              </div>

              <!-- owner dropdown -->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerID">
                  <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                    {{ owner.name }}
                  </option>
                </select>
              </div>

              <!-- title input -->
              <div class="a-spacing-top-medium">
                <label>Title</label>
                <input type="text" class="a-input-text" style="width: 100%" v-model="title">
              </div>

              <!-- price input -->
              <div class="a-spacing-top-medium">
                <label>Price</label>
                <input type="number" class="a-input-text" style="width: 100%" v-model="price">
              </div>

              <!-- stockquantity input -->
              <div class="a-spacing-top-medium">
                <label>Stock quantity</label>
                <input type="number" class="a-input-text" style="width: 100%"
                v-model="stockQuantity">
              </div>

              <!-- description textarea -->
              <div class="a-spacing-top-medium">
                <label>Description</label>
                <textarea placeholder="Provide details such as product description"
                style="width: 100%" v-model="description">
                </textarea>
              </div>

              <!-- photo input-->
              <div class="a-spacing-top-medium">
                <label>Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected">
                    <p style="margin-top: -70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>

              <!-- button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddProduct">Add product</span>
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  // asyncData is used for only api calls
  async asyncData({ $axios }) {
    try {
      const categories = $axios.$get('http://localhost:3000/api/categories');
      const owners = $axios.$get('http://localhost:3000/api/owners');

      // promise.all runs each fetch at the same time
      const [catResponse, ownersResponse] = await Promise.all([categories, owners]);

      return {
        categories: catResponse.categories,
        owners: ownersResponse.owners,
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: '',
      price: 0,
      description: '',
      fileName: '',
      selectedFile: null,
      stockQuantity: 1,
    };
  },

  methods: {
    onFileSelected(event) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },

    async onAddProduct() {
      const data = new FormData();

      data.append('title', this.title);
      data.append('price', this.price);
      data.append('stockQuantity', this.stockQuantity);
      data.append('description', this.description);
      data.append('ownerID', this.ownerID);
      data.append('categoryID', this.categoryID);
      data.append('photo', this.selectedFile, this.selectedFile.name);

      const result = await this.$axios.$post('http://localhost:3000/api/products', data);

      this.$router.push('/');
    },
  },
};
</script>
