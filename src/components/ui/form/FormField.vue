<template>
  <!-- render the default slot and expose componentField, error, meta -->
  <div>
    <slot :componentField="componentField" :error="errorMessage" :meta="meta" />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { useField } from 'vee-validate';
import { defineProps } from 'vue';

const props = defineProps<{ name: string }>();
if (!props.name) {
  throw new Error('FormField requires a `name` prop');
}

// useField gives us reactive refs and helpers for this field
const { value, meta, errorMessage, handleChange, handleBlur } = useField(props.name);

// componentField binds to native inputs via value and onInput/onBlur
const componentField = {
  name: props.name,
  value,
  // for native inputs -> onInput uses handleChange
  onInput: (e: Event) => handleChange(e as any),
  onBlur: () => handleBlur(),
  // support v-model bindings used by some components
  'onUpdate:modelValue': (v: any) => (value.value = v)
};

// provide current field error and meta for FormMessage etc.
// These are reactive refs from vee-validate
provide('fieldError', errorMessage);
provide('fieldMeta', meta);
</script>
