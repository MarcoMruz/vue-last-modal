import { VueConstructor } from 'vue'

import ModalLayoutDialog from '@/components/ModalLayoutDialog.vue'
import ModalLayout from '@/components/ModalLayout.vue'
import ModalStack from '@/components/ModalStack.vue'
import {
  AlertOptions,
  Config,
  OpenAlertInterface,
  OpenConfirmInterface,
  OpenDialogInterface,
  OpenModalInterface,
  VueLastModal
} from 'types'

const defaultConfig: Config = {
  cancelLabel: 'Cancel',
  confirmLabel: 'OK',
  buttonClassName: 'btn btn-secondary',
  primaryButtonClassName: 'btn btn-primary',
  backdropTransitionName: 'ModalStack__backdrop',
  modalTransitionName: 'ModalStack__modal'
}

const vueLaslModal: typeof VueLastModal = {
  _installed: false as boolean,

  _container: undefined as Vue | undefined,

  install(Vue: VueConstructor, config: Config = {}) {
    if (this._installed) {
      return
    }

    this._installed = true

    config = { ...defaultConfig, ...config }

    Vue.component('modal-layout', ModalLayout)

    const createModalStackContainer = (parent: Vue) => {
      const placeholder = document.createElement('div')
      document.body.appendChild(placeholder)

      return new Vue({
        parent,
        render: (h) => h(ModalStack, { props: { config } })
      }).$mount(placeholder)
    }

    const getModalStackComponent = (parent: Vue) => {
      if (!this._container) {
        this._container = createModalStackContainer(parent)
      }

      return this._container.$children[0]
    }

    Vue.prototype.$modal = function (component, props = {}) {
      return new Promise((resolve) =>
        getModalStackComponent(this.$root).open({
          component,
          props,
          resolve
        })
      )
    } as OpenModalInterface

    Vue.prototype.$dialog = function ({ title, message, buttons }) {
      return this.$modal(ModalLayoutDialog, {
        title,
        message,
        buttons
      })
    } as OpenDialogInterface

    Vue.prototype.$alert = function (options: AlertOptions) {
      if (typeof options === 'string') {
        options = {
          message: options
        }
      }

      const { title, message, confirmLabel = config.confirmLabel } = options

      return this.$dialog({
        title,
        message,
        buttons: [
          {
            className: config.buttonClassName,
            label: confirmLabel || ''
          }
        ]
      })
    } as OpenAlertInterface

    Vue.prototype.$confirm = function (options) {
      if (typeof options === 'string') {
        options = {
          message: options
        }
      }

      const {
        title,
        message,
        cancelLabel = config.cancelLabel,
        confirmLabel = config.confirmLabel
      } = options

      return this.$dialog({
        title,
        message,
        buttons: [
          {
            className: config.buttonClassName,
            label: cancelLabel || '',
            value: false
          },
          {
            className: config.primaryButtonClassName,
            label: confirmLabel || '',
            value: true
          }
        ]
      })
    } as OpenConfirmInterface
  }
}

export default vueLaslModal
