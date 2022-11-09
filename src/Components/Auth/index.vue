<template>
  <div class="w-80 m-auto">
    <main class="form-signin w-100 m-auto">
      <Form @submit="onSubmit" :validation-schema="formSchema">
        <h1 class="h3 mb-3 fw-normal capitalize">sign up / sign in</h1>
        <div v-if="!signin" class="form-group">
          <Field name="name" v-slot="{ field, errors, errorMessage }">
            <div class="form-floating m-2">
              <input
                type="text"
                v-bind="field"
                class="form-control"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Name</label>
              <div class="input_alert text-red-500" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>
        <div class="form-group">
          <Field name="email" v-slot="{ field, errors, errorMessage }">
            <div class="form-floating m-2">
              <input
                type="email"
                v-bind="field"
                class="form-control"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Email address</label>
              <div class="input_alert text-red-500" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>
        <div class="form-group">
          <Field name="password" v-slot="{ field, errors, errorMessage }">
            <div class="form-floating m-2">
              <input
                type="password"
                v-bind="field"
                class="form-control"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Password</label>
              <div class="input_alert text-red-700" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>

        <button
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          v-text="signin ? 'Sign in' : 'Sign up'"
        ></button>

        <p
          @click="signin = !signin"
          v-if="signin"
          class="
            w-fit
            text-xl text-right
            mt-4
            cursor-pointer
            hover:bg-yellow-200 hover:text-blue-800
            capitalize
          "
        >
          dont have account? sign up
        </p>
        <p
          @click="signin = !signin"
          v-if="!signin"
          class="
            w-fit
            text-xl text-right
            mt-4
            cursor-pointer
            hover:bg-yellow-200 hover:text-blue-800
            capitalize
          "
        >
          already have account? sign in
        </p>
      </Form>
    </main>
  </div>
</template>


<script>
import { Field, Form } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Auth",
  components: {
    Field,
    Form,
  },

  data() {
    return {
      signin: false,
      formSchema: {
        name,
        email: yup
          .string()
          .required("The email is required")
          .email("Not a valid email"),
        password: yup.string().required("The password is required"),
      },
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {

      if (this.signin) {

        // sign in
        this.$store.dispatch("auth/signIn", values);
      } else {
        //sign up
        this.$store.dispatch("auth/signUp", values);
      }
      resetForm();
    },
  },
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>