import Vue, { Component, PluginObject, PropOptions } from 'vue'

export type Modal = {
  component: Component
  props?: PropOptions
  resolve: (result: unknown) => never
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
  value?: unknown
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
  <T = unknown>(
    this: Vue,
    component: Component,
    props?: { [key: string]: unknown }
  ): Promise<T>
}

export interface OpenDialogInterface extends Vue {
  <T = unknown>(this: Vue, options: DialogOptions): Promise<T>
}

export interface OpenAlertInterface extends Vue {
  <T = unknown>(this: Vue, options: AlertOptions): Promise<T>
}

export interface OpenConfirmInterface extends Vue {
  <T = unknown>(this: Vue, options: ConfirmOptions): Promise<T>
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
