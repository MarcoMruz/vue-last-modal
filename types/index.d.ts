import Vue, { Component, PluginObject, PropOptions } from 'vue'

export type Modal = {
  component: Component
  props?: PropOptions
  resolve: (result: any) => never
}

export type ModalRecord = Modal & {
  id: number
}

export type Config = Partial<{
  cancelLabel: string
  confirmLabel: string
  buttonClassName: string
  primaryButtonClassName: string
  backdropTransitionName: string
  modalTransitionName: string
}>

export type Button = {
  className?: string
  label: string
  value?: any
}

export type DialogOptions = {
  title?: string
  message?: string
  buttons?: Button[]
}

export type AlertOptions =
  | string
  | {
      title?: string
      message: string
      confirmLabel?: string
    }

export type ConfirmOptions =
  | string
  | {
      title?: string
      message: string
      cancelLabel?: string
      confirmLabel?: string
    }

export interface OpenModalInterface {
  <T = any>(
    this: Vue,
    component: Component,
    props?: { [key: string]: any }
  ): Promise<T>
}

export interface OpenDialogInterface extends Vue {
  <T = any>(this: Vue, options: DialogOptions): Promise<T>
}

export interface OpenAlertInterface extends Vue {
  (this: Vue, options: AlertOptions): Promise<void>
}

export interface OpenConfirmInterface extends Vue {
  (this: Vue, options: ConfirmOptions): Promise<boolean>
}

export declare const VueLastModal: PluginObject<Config>

export default VueLastModal

declare module 'vue/types/vue' {
  interface Vue {
    $modal: OpenModalInterface
    $alert: OpenAlertInterface
    $dialog: OpenDialogInterface
    $confirm: OpenConfirmInterface
  }
}
