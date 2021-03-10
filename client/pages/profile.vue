<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-spacing-top-medium" />
          <h2>Profile Page</h2>

          <a href="#" @click="onLogout">Logout</a>
          <form>
            <!-- name -->
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input v-model="name" type="text" class="a-input-text" style="width: 100%" :placeholder="$auth.$state.user.name">
            </div>

            <!-- email -->
            <div class="a-spacing-top-medium">
              <label>Email</label>
              <input v-model="email" type="email" class="a-input-text" style="width: 100%" :placeholder="$auth.$state.user.email">
            </div>

            <!-- password -->
            <div class="a-spacing-top-medium">
              <label>Password</label>
              <input v-model="password" type="text" class="a-input-text" style="width: 100%">
            </div>

            <!-- button -->
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onUpdateProfile">Update profile</span>
                </span>
              </span>
            </div>
          </form>

          <br>
        </div>
        <div class="col-sm-3" />
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },

  methods: {
    async onUpdateProfile () {
      try {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        const response = await this.$axios.$put('/api/auth/user', data)

        if (response.success) {
          this.name = ''
          this.email = ''
          this.password = ''

          await this.$auth.fetchUser()
        }
      } catch (err) {
        console.log(err)
      }
    },

    async onLogout () {
      await this.$auth.logout()
    }
  }
}
</script>
