<template>
  <div
    class="ModalLayout"
    :class="{ hasHeader, hasFooter, isScrollable, isPlain }"
    :style="computedStyle"
  >
    <div class="ModalLayout__close" @click="close()" v-if="!hideCloser"></div>

    <div class="ModalLayout__header" v-if="hasHeader">
      <slot name="header">
        <div class="ModalLayout__title">
          {{ title }}
        </div>
      </slot>
    </div>

    <div class="ModalLayout__body">
      <slot />
    </div>

    <div class="ModalLayout__footer" v-if="hasFooter">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },

    hideCloser: {
      type: Boolean
    },

    scroll: {
      type: Boolean
    },

    plain: {
      type: Boolean
    },

    width: {
      type: [Number, String],
      default: 600
    }
  },

  computed: {
    isScrollable(): boolean {
      return this.scroll
    },

    isPlain(): boolean {
      return this.plain
    },

    hasHeader(): boolean {
      return Boolean(this.$slots.header || this.title)
    },

    hasFooter(): boolean {
      return Boolean(this.$slots.footer)
    },

    computedStyle(): Partial<CSSStyleDeclaration> {
      const maxWidth = this.width + (Number(this.width) ? 'px' : '')

      if (maxWidth && maxWidth !== 'auto') {
        return {
          width: '100%',
          maxWidth
        }
      }

      return {}
    }
  },

  methods: {
    close() {
      this.$root.$emit('LastModal.closeTop')
    }
  }
})
</script>

<style lang="postcss">
.ModalLayout {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: auto;
  min-height: fit-content;

  background-color: white;
  border-radius: 4px;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &.isScrollable {
    min-height: auto;
    max-height: calc(100vh - 3rem);
  }
}

.ModalLayout__header {
  flex: 0 0 auto;
  padding: 1.25rem 4rem 1.25rem 1.5rem;

  .ModalLayout.isPlain {
    padding: 0;
  }
}

.ModalLayout__title {
  font-size: larger;
}

.ModalLayout__close {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4.3rem;

  font-size: 1.85rem;
  opacity: 0.4;

  &::before {
    content: '\00d7';

    transform: translateY(-0.15rem);
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.ModalLayout__body {
  flex: 1 0 auto;
  padding: 1.5rem;
  border-radius: 4px;
}

.ModalLayout.hasHeader .ModalLayout__body {
  padding-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.ModalLayout.hasFooter .ModalLayout__body {
  padding-bottom: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.ModalLayout.isScrollable .ModalLayout__body {
  flex: 1 1 auto;
  overflow: auto;
  padding: 1.5rem;

  overscroll-behavior: contain;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.ModalLayout.isScrollable.hasHeader .ModalLayout__body {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.ModalLayout.isScrollable.hasFooter .ModalLayout__body {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.ModalLayout.isPlain .ModalLayout__body {
  padding: 0;
}

.ModalLayout__footer {
  flex: 0 0 auto;
  padding: 1.25rem 1.5rem;
}

.ModalLayout.isPlain .ModalLayout__footer {
  padding: 0;
}
</style>
