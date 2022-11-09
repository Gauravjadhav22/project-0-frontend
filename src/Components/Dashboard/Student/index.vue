<template>
  <div>
    <h2 class="capitalize font-semibold" v-if="searched">
      search any student ...
    </h2>

    <!-- SHOW STUDENT -->
    <div
      class="
        bg-green-700
        rounded-3xl
        shadow
        capitalize
        m-3
        flex flex-col
        items-center
        justify-center
      "
      v-if="!updatetrue && !addStudent"
    >
      <div class="rounded-xl shadow-md ml-3 bg-white">
        <div
          class="
            flex
            justify-start
            items-center
            rounded-md
            border-2
            m-0
            bg-pink-200
          "
        >
          <div
            @click="updatetrue = true"
            class="flex items-center text-4xl m-2 text-yellow-600"
          >
            <EditOutlined />
          </div>
          <div
            @click="deleteStudent"
            class="flex items-center text-4xl m-2 text-red-800"
          >
            <DeleteOutlined />
          </div>
          <h1 class="text-2xl font-bold">&nbsp; id:{{ id }}</h1>
        </div>
        <div class="m-2 flex border-2 border-yellow-300 text-left p-1 text-xl">
          name:
          <p class="font-semibold ml-1">{{ name }}</p>
        </div>
        <div class="m-2 flex border-2 border-yellow-300 text-left p-1 text-xl">
          email:
          <p class="font-semibold ml-1">{{ email }}</p>
        </div>
        <div class="m-2 flex border-2 border-yellow-300 text-left p-1 text-xl">
          address:
          <p class="font-semibold ml-1">{{ address }}</p>
        </div>
        <div class="m-2 flex border-2 border-yellow-300 text-left p-1 text-xl">
          classname:
          <p class="font-semibold ml-1">{{ className }}</p>
        </div>
        <div class="m-2 flex border-2 border-yellow-300 text-left p-1 text-xl">
          dob:
          <p class="font-semibold ml-1">{{ dob }}</p>
        </div>
        <div class="m-2 flex border-2 border-yellow-300 text-left p-1 text-xl">
          contact:
          <p class="font-semibold ml-1">{{ contact }}</p>
        </div>
      </div>
    </div>
    <!-- EDIT STUDENT -->
    <div class="flex justify-center" v-if="updatetrue || addStudent">
      <Form @submit="onSubmit" :validation-schema="formSchema">
        <div class="form-group">
          <Field
            name="name"
            :value="name"
            v-slot="{ field, errors, errorMessage }"
          >
            <div style="width: fit-content" class="form-floating m-2">
              <input
                type="text"
                v-bind="field"
                class="form-control px-2 w-80"
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
          <Field
            name="className"
            :value="className"
            v-slot="{ field, errors, errorMessage }"
          >
            <div style="width: fit-content" class="form-floating m-2">
              <input
                type="text"
                v-bind="field"
                class="form-control px-2 w-80"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Classname</label>
              <div class="input_alert text-red-500" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>
        <div class="form-group">
          <Field
            name="contact"
            :value="contact"
            v-slot="{ field, errors, errorMessage }"
          >
            <div style="width: fit-content" class="form-floating m-2">
              <input
                type="text"
                v-bind="field"
                class="form-control px-2 w-80"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Contact</label>
              <div class="input_alert text-red-500" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>
        <div class="form-group">
          <Field
            name="email"
            :value="email"
            v-slot="{ field, errors, errorMessage }"
          >
            <div style="width: fit-content" class="form-floating m-2">
              <input
                type="email"
                v-bind="field"
                class="form-control px-2 w-80"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Email Address</label>
              <div class="input_alert text-red-500" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>
        <div class="form-group">
          <Field
            name="dob"
            :value="dob"
            v-slot="{ field, errors, errorMessage }"
          >
            <div style="width: fit-content" class="form-floating m-2">
              <input
                type="text"
                v-bind="field"
                class="form-control px-2 w-80"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Date Of Birth</label>
              <div class="input_alert text-red-500" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>
        <div class="form-group">
          <Field
            name="address"
            :value="address"
            v-slot="{ field, errors, errorMessage }"
          >
            <div style="width: fit-content" class="form-floating m-2">
              <input
                type="text"
                value="address"
                v-bind="field"
                class="form-control px-2 w-80"
                id="floatingInput"
              />

              <label for="floatingInput" class="text-lg">Address</label>
              <div class="input_alert text-red-500" v-if="errors.length !== 0">
                {{ errorMessage }}
              </div>
            </div>
          </Field>
        </div>

        <div
          style="width: fit-content"
          class="m-2 flex justify-between text-left p-1 text-xl"
        >
          <button
            v-if="!addStudent"
            @click="updatetrue = false"
            class="
              rounded
              text-white
              p-2
              m-1
              mx-2
              bg-red-500
              hover:bg-red-700
              text-lg
            "
          >
            cancel
          </button>
          <button
         
            v-text="updatetrue && !addStudent ? 'Update' : 'Add Student'"
            @click="handleSubmit"
            class="
              rounded
              text-white
              p-2
              m-1
              mx-2
              bg-green-500
              hover:bg-green-700
              text-lg
            "
          ></button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import store from "@/Store";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Field,
    Form,
  },
  data() {
    return {
      searched: false,
      updatetrue: false,
      formSchema: {
        name: yup.string().required("The name is required"),
        className: yup.string().required("The className is required"),
        email: yup
          .string()
          .required("The email is required")
          .validate("email is not valid"),
        address: yup.string().required("The address is required"),
        dob: yup.string().required("The dob is required"),
        contact: yup.string().required("The contact is required"),
      },
    };
  },

  methods: {
    deleteStudent() {
      this.$store.dispatch("students/deleteStudent", {
        id: this.id,
      });
    },
    onSubmit(values, { resetForm }) {
      if (this.updatetrue && !this.addStudent) {
        this.$store.dispatch("students/updateStudent", {
          ...values,
          id: this.id,
        });
        this.updatetrue = false;
      } else if (!this.updatetrue && this.addStudent) {
        this.$store.dispatch("students/addStudent", values);
      }
      resetForm();
    },
  },
  props: [
    "name",
    "address",
    "email",
    "className",
    "contact",
    "dob",
    "addStudent",
    "key",
    "id",
  ],
  components: { DeleteOutlined, EditOutlined, Field, Form },
};
</script>