<template>
  <modal-layout class="ModalLayoutDialog" width="480" :title="title" closer>
    {{ message }}

    <template slot="footer" v-if="buttons && buttons.length">
      <div class="ModalLayoutDialog__buttons">
        <span class="ModalLayoutDialog__buttonWrapper" v-for="(button, $index) in buttons" :key="$index">
          <button type="button" :class="button.className" @click="$emit('close', button.value)" >
            {{ button.label }}
          </button>
        </span>
      </div>
    </template>
  </modal-layout>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { Button } from 'types'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },

    message: {
      type: String,
      default: ''
    },

    buttons: {
      type: Array as PropType<Button[]>
    }
  },

  mounted() {
    const buttons = this.$el.querySelectorAll('button')

    if (buttons.length) {
      buttons[buttons.length - 1].focus()
    }
  }
})
</script>

<style lang="postcss">
.ModalLayoutDialog__buttons {
  text-align: right;
  margin-top: 1rem;

  & > * + * {
    margin-left: .5rem;
  }
}
</style>


