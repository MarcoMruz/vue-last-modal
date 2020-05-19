<template>
  <div id="app">
    <div class="container">
      <div class="py-3 mt-3 mb-5 border-bottom">
        <h1>Last Modal</h1>
      </div>

      <button class="btn btn-secondary" @click="open()">
        Open
      </button>

      <button class="btn btn-secondary" @click="openPlain()">
        Open plain
      </button>

      <button class="btn btn-secondary" @click="alert()">
        Alert
      </button>

      <button class="btn btn-secondary" @click="confirm()">
        Confirm
      </button>

      <button class="btn btn-secondary" @click="openScrollable()">
        Open scrollable
      </button>
    </div>
  </div>
</template>

<script>
import BasicModal from './modals/BasicModal'
import PlainModal from './modals/PlainModal'
import ScrollableModal from './modals/ScrollableModal'

export default {
  methods: {
    open() {
      this.$modal(BasicModal)
    },

    alert() {
      this.$alert({title: 'Alert!', message: 'Now panic and freak out!'})
    },

    confirm() {
      this.$confirm('Do you want to confirm?')
    },

    openPlain() {
      this.$modal(PlainModal)
    },

    openScrollable() {
      this.$modal(ScrollableModal)
    }
  }
};
</script>

<style lang="postcss">
  .btn + .btn {
    margin-left: .5rem;
  }
</style>

