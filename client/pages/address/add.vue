<template>
  <!--MAIN-->
  <main>
    <!--REGISTER ADDRESS-->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3" />
          <div class="col-sm-6">
            <div class="a-section a-spacing-medium">
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul>
                  <li>
                    <a href="#">
                      <span>Your Account</span>
                    </a>
                  </li>
                  <li class="a-breadcrumb-divider">
                    ›
                  </li>
                  <li>
                    <a href="#">
                      <span>Your Adresses</span>
                    </a>
                  </li>
                  <li class="a-breadcrumb-divider">
                    ›
                  </li>
                  <li class="active">
                    <a href="#">
                      <span>New Address</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="a-section">
              <h2>Add a new address</h2>
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b>
                  Or pick up your packages at your convenience from our self-service locations. To add an Amazon Pickup Point or Locker, click
                  <a
                    href="#"
                  >here</a>.
                </b>
              </div>
              <!-- Error Message -->
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b />
              </div>
              <form>
                <div class="a-spacing-medium a-spacing-top-medium">
                  <!-- Country / Region -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Country/Region</label>
                    <select v-model="country" class="a-select-option">
                      <option v-for="country in countries" :key="country.alpha2Code" :value="country.name">
                        {{ country.name }}
                      </option>
                      <option />
                    </select>
                  </div>
                  <!-- Full name -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Full Name</label>
                    <input v-model="fullName" type="text" class="a-input-text" style="width: 100%;">
                  </div>
                  <!-- Street Address -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Street Address</label>
                    <input
                      v-model="streetAddress1"
                      type="text"
                      class="a-input-text"
                      style="width: 100%;"
                      placeholder="Street and number, P.O. box, c/o."
                    >
                    <!-- Street Address 2 -->
                    <input
                      v-model="streetAddress2"
                      type="text"
                      class="a-input-text a-spacing-top-small"
                      style="width: 100%;"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    >
                  </div>
                  <!-- City -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">City</label>
                    <input v-model="city" type="text" class="a-input-text" style="width: 100%;">
                  </div>
                  <!-- State -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">State / Province / Region</label>
                    <input v-model="state" type="text" class="a-input-text" style="width: 100%;">
                  </div>
                  <!-- Zip Code -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Zip Code</label>
                    <input v-model="zipCode" type="text" class="a-input-text" style="width: 100%;">
                  </div>
                  <!-- Phone Number -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Phone Number</label>
                    <input v-model="phoneNumber" type="text" class="a-input-text" style="width: 100%;">
                    <div class="a-section a-spacing-none a-spacing-top-micro">
                      <span class="a-size-mini">May be used to assist delivery</span>
                    </div>
                  </div>
                  <div class="a-spacing-base a-spacing-top-medium">
                    <h3>Add delivery instructions</h3>
                  </div>
                  <!-- Delivery Instruction -->
                  <div class="a-spacing-top-medium">
                    <label
                      style="margin-bottom: 0px;"
                    >Do we need additional instructions to find this address?</label>
                    <textarea
                      v-model="deliveryInstructions"
                      placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions"
                      style="height:6em; width: 100%;"
                    />
                  </div>
                  <!-- Security code -->
                  <div class="a-spacing-top-medium">
                    <label
                      style="margin-bottom: 0px;"
                    >Do we need a security code or a call box number to access this building?</label>
                    <input v-model="securityCode" type="text" class="a-input-text" style="width: 100%;" placeholder="1234">
                  </div>
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Weekend delivery</label>
                    <a href="#">
                      <i class="fas fa-angle-down" /> Which days can you receive packages?
                    </a>
                  </div>
                  <div class="a-spacing-top-medium" />
                  <hr>
                  <div class="a-spacing-top-medium">
                    <span>
                      <b>Make sure your address is correct</b>
                    </span>
                  </div>
                  <div>
                    <span>If the address contains typos or other errors, your package may be undeliverable.</span>
                  </div>
                  <div class="a-spacing-top-small">
                    <span>
                      <a href="#">Tips for entering addresses</a>
                    </span>
                    <span>|</span>
                    <span>
                      <a href="#">APO/FPO address tips</a>
                    </span>
                  </div>
                  <div class="a-spacing-top-large">
                    <span class="a-button-register">
                      <span class="a-button-inner">
                        <span class="a-button-text" @click="onAddAddress">Add address</span>
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-3" />
        </div>
      </div>
    </div>
    <!--/REGISTER ADDRESS-->
  </main>
  <!--/MAIN-->
</template>
<script>
export default {
  async asyncData ({ $axios }) {
    try {
      const response = await $axios.$get('/api/countries')

      if (response.success) {
        return {
          countries: response.countries
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      country: 'Nigeria',
      fullName: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      deliveryInstructions: '',
      securityCode: ''
    }
  },

  methods: {
    async onAddAddress () {
      try {
        const data = {
          country: this.country,
          fullName: this.fullName,
          streetAddress1: this.streetAddress1,
          streetAddress2: this.streetAddress2,
          city: this.city,
          state: this.state,
          zipCode: this.zipCode,
          phoneNumber: this.phoneNumber,
          deliveryInstructions: this.deliveryInstructions,
          securityCode: this.securityCode
        }
        const response = await this.$axios.$post('/api/addresses', data)

        if (response.success) {
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
