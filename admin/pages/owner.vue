<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new owner</h2>
          <form>
            <div class="a-spacing-top-medium">
              <!-- name -->
              <label>Name</label>
              <input type="text" class="a-input-text" style="width: 100%" v-model="name">
            </div>

              <!-- about -->
            <div class="a-spacing-top-medium">
              <label>About</label>
              <textarea class="a-input-text" style="width: 100%"
              v-model="about"></textarea>
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
                    <span class="a-button-text" @click="onAddOwner">Add owner</span>
                  </span>
                </span>
              </div>
          </form>

          <br />
          <ul v-for="owner in owners" :key="owner._id" class="list-group-item">
            <li>{{ owner.name }}</li>
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
      const response = await $axios.$get('http://localhost:3000/api/owners');

      return {
        owners: response.owners,
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      name: '',
      about: '',
      selectedFile: null,
      fileName: '',
    };
  },

  methods: {
    async  onAddOwner() {
      try {
        const data = new FormData();

        data.append('name', this.name);
        data.append('about', this.about);
        data.append('photo', this.selectedFile, this.selectedFile.name);

        const result = await this.$axios.$post('http://localhost:3000/api/owners', data);

        this.owners.push({ name: this.name });

        this.name = '';
        this.about = '';
        this.selectedFile = null;
        this.fileName = '';
      } catch (err) {
        console.log(err);
      }
    },

    onFileSelected(event) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
  },
};
</script>
