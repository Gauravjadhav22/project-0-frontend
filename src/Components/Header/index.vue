<template>
  <header>
    <div
      class="
        mb-5
        flex
        justify-center
        items-center
        flex-col
        xl:flex-row xl:justify-around
        lg:justify-around lg:flex-row
      "
    >
      <nav>
        <div class="flex justify-between">
          <div
            v-if="isAuth"
            class="m-2 bg-gray-500 hover:bg-gray-700 rounded text-white p-2"
          >
            <router-link class="cursor-default text-white" to="/"
              >Home</router-link
            >
          </div>
          <div
            v-if="!isAuth"
            class="m-2 bg-gray-500 hover:bg-gray-700 rounded text-white p-2"
          >
            <router-link class="cursor-default text-white" to="/auth"
              >sign In / Sign Up</router-link
            >
          </div>
          <div
            v-if="isAuth"
            class="m-2 bg-gray-500 hover:bg-gray-700 rounded text-white p-2"
          >
            <button @click="signout" class="cursor-default text-white">
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <h5
        class="
          bg-yellow-200
          text-purple-900
          m-2
          shadow
          font-bold
          text-2xl
          capitalize
        "
      >
        students information
      </h5>
      <div v-if="isAuth" class="flex items-center justify-end m-4">
        <input
          class="
            animate-bounce
            shadow-md
            m-1
            p-1
            text-xl
            border-2 border-green-300
          "
          type="text"
          v-model="search"
          placeholder="student name..."
        />
        <div class="w-0">
          <SearchOutlined
            v-if="!searchCancel"
            @click="getAStudent"
            class="text-3xl p-1 bg-purple-800 rounded text-white"
          />
          <span
            v-else
            @click="refreshStudents"
            class="text-3xl p-2 cursor-pointer bg-purple-800 rounded text-white"
            >X</span
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { SearchOutlined } from "@ant-design/icons-vue";

import { mapGetters } from "vuex";
import store from "@/Store";

export default {
  data() {
    return { search: "", searchCancel: false };
  },
  components: {
    SearchOutlined,
  },
  methods: {
    refreshStudents() {
      this.$router.go(0);
    },
    getAStudent() {
      this.searchCancel = true;
      store.dispatch("students/getStudent", this.search);
    },
    signout() {
      store.dispatch("auth/signOut");
    },
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
      getUserData: "auth/getUserData",
    }),
  },
  name: "Header",
  props: ["msg"],
};
</script>