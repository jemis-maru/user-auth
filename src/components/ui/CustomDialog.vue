<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="modal">
      <dialog open v-if="show">
        <header>
          <h2>{{ title }}</h2>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu>
          <custom-button v-if="isErr" @click="tryClose">
            Close
          </custom-button>
          <custom-button v-else @click="tryClose">
            <router-link class="routeLinkClass" :to="routePath">{{ btnName }}</router-link>
          </custom-button>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
import CustomButton from "./CustomButton.vue";

export default {
  components: {
    "custom-button": CustomButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    btnName: {
      type: String,
      required: false,
    },
    routePath: {
      type: String,
      required: false,
    },
    isErr: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.routeLinkClass{
  color: #ffffff;
  text-decoration: none;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>