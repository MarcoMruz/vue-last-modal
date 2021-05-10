<template>
  <div class="ModalStack">
    <transition :name="config.backdropTransitionName">
      <div class="ModalStack__backdrop" v-if="modals.length" />
    </transition>

    <transition-group :name="config.modalTransitionName">
      <div v-for="modal in modals" class="ModalStack__modalWrapper" :key="modal.id" @click="closeByBackdropClick($event, modal)">
        <component
          class="ModalStack__modal"
          v-bind="modal.props"
          :is="modal.component"
          :class="{isTop: topModal.id === modal.id}"
          :ref="`modal_${modal.id}`"
          @close="close(modal, $event)"
        />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Modal, ModalRecord } from 'types'

export default Vue.extend({
  name: "modal-stack",

  props: {
    config: {
      type: Object
    }
  },

  data() {
    return {
      sequence: 1 as number,
      modals: [] as ModalRecord[]
    }
  },

  computed: {
    topModal(): ModalRecord | null {
      return this.modals.length ? this.modals[this.modals.length - 1] : null
    }
  },

  methods: {
    open(modal: Modal) {
      (document.activeElement as HTMLElement)?.blur()

      this.modals.push({
        ...modal, id: this.sequence++
      })
    },

    close(modal: ModalRecord, result: any = undefined) {
      if (!this.modals.find(({id}) => id === modal.id)) {
        return
      }

      const closingRoutine = () => {
        this.modals = this.modals.filter(({id}) => id !== modal.id)
        modal && modal.resolve(result)
      }

      const modalInstance = this._getModalInstance(modal)

      if (modalInstance && 'before-close' in modalInstance.$listeners) {
        modalInstance.$emit('before-close', closingRoutine)
      } else {
        closingRoutine()
      }
    },

    closeTop() {
      if (this.topModal) {
        this.close(this.topModal)
      }
    },

    closeByEscKey(e: KeyboardEvent) {
      if (this.topModal && e.key === "Escape" && !e.defaultPrevented) {
        e.preventDefault()
        this.closeTop()
      }
    },

    closeByBackdropClick(e: MouseEvent, modal: ModalRecord) {
      if (e.target === e.currentTarget) {
        this.close(modal)
      }
    },

    _getModalInstance(modal: ModalRecord) {
      return (this.$refs[`modal_${modal.id}`] as any) [0].$children[0]
    }
  },

  mounted() {
    document.body.appendChild(this.$el)
    document.addEventListener("keydown", this.closeByEscKey)

    this.$root.$on("LastModal.open", this.open)
    this.$root.$on("LastModal.close", this.close)
    this.$root.$on("LastModal.closeTop", this.closeTop)
  },

  destroyed() {
    document.body.removeChild(this.$el)
    document.removeEventListener("keydown", this.closeByEscKey)

    this.$root.$off("LastModal.open", this.open)
    this.$root.$off("LastModal.close", this.close)
    this.$root.$off("LastModal.closeTop", this.closeTop)
  }
})
</script>

<style lang="postcss">
.ModalStack {
  position: fixed;
  z-index: 1050;
}

.ModalStack__backdrop {
  background: rgba(0, 0, 0, 0.35);

  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ModalStack__modalWrapper {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  padding: 1.5rem;

  overflow: auto;
}

.ModalStack__modalScroller {
  overflow: auto;
  position: relative;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  width: 100%;
}

.ModalStack__modal {
  transition: filter .15s;

  &:not(.isTop) {
    filter: brightness(80%);
  }
}

/* animations */

.ModalStack__modal-enter-active,
.ModalStack__modal-leave-active {
  transition: opacity 0.25s;
  pointer-events: none;
}

.ModalStack__modal-enter,
.ModalStack__modal-leave-to {
  opacity: 0;
  pointer-events: none;
}

.ModalStack__backdrop-enter-active,
.ModalStack__backdrop-leave-active {
  transition: opacity 0.25s;
  pointer-events: none;
}

.ModalStack__backdrop-enter,
.ModalStack__backdrop-leave-to {
  opacity: 0;
  pointer-events: none;
}
</style>
