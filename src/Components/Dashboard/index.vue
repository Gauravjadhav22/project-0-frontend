<template>
  <div>
    <div
      v-if="!addStudent"
      style="width: fit-content"
      @click="addStudent = true"
      class="
        p-2
        pt-0
        rounded
        text-lg text-white
        capitalize
        bg-purple-800
        fixed
        m-auto
        flex
        items-end
        justify-center
        right-10
        top-64
        xl:right-40
        lg:top-40
        xl:top-40
        lg:right-40
      "
    >
      <button class="">Add Student</button>
      <PlusOutlined class="animate-pulse font-bold text-3xl self-stretch" />
    </div>
  </div>

  <!-- Show And Update Student  -->

  <div
    v-show="!addStudent"
    class="flex justify-center items-center flex-wrap my-10 mx-2 "
  >
    <Student
      v-for="student in students"
      :name="student.name"
      :dob="student.dob"
      :className="student['class name']"
      :email="student.email"
      :address="student.address"
      :contact="student.contact"
      :key="student.id"
      :id="student.id"
    />
  </div>

  <!-- Add Student  -->
  <Student :addStudent="addStudent" v-if="addStudent" />
  <button
    v-if="addStudent"
    @click="addStudent = false"
    class="rounded text-white p-2 m-1 mx-2 bg-red-500 hover:bg-red-700 text-lg"
  >
    cancel adding student
  </button>

  <p v-if="students.length <= 0" class="text-2xl text-blue-600 capitalize">
    no student were found
  </p>
</template>

<script>
import { PlusOutlined } from "@ant-design/icons-vue";
import Student from "./Student";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addStudent: false,
    };
  },

  mounted() {
    this.$store.watch(async () => {
      if (this.students.length <= 0) {
        this.$store.dispatch("students/getAllStudents");
      }
    });
  },
  computed: {
    ...mapGetters({
      students: "students/getAllStudents",
    }),
  },
  components: {
    Student,
    PlusOutlined,
  },
};
</script>