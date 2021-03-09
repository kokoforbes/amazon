<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4" />
        <div class="col-sm-4">
          <div class="text-center">
            <a href="#">
              <img src="/img/logo-black.png" alt="logo">
            </a>
          </div>

          <form class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">
                  Create account
                </h1>

                <!-- name -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">Your name</label>
                  <input id="ap_customer_name" type="text" class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                </div>

                <!-- Email -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">Email</label>
                  <input id="ap_customer_name" type="email" class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                </div>

                <!-- Password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">Password</label>
                  <input id="ap_customer_name" type="password" class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info">
                  <div class="a-alert-container">
                    <div class="a-lert-content">
                      Password must be atleast 6 characters.
                    </div>
                  </div>
                </div>

                <!-- button -->
                <div class="a-row a-spacing-extra-large mb-4">
                  <span class="a-button-primary">
                    <span class="a-button-inner">
                      <span class="a-button-text">Create your Amazon account</span>
                    </span>
                  </span>

                  <div class="a-row a-spacing-top-medium a-size-small">
                    <b>By creating an account, you agree to Amazon's
                      <a href="#">Conditions of Use</a> and
                      <a href="#">Privacy Notice</a>
                    </b>
                  </div>
                </div>

                <hr>

                <div class="a-row">
                  <b>Already have an account ?
                    <nuxt-link class="a-link-emphasis" to="/login">Sign in</nuxt-link>
                  </b>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'none'
}
</script>
