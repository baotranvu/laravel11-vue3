<script lang="ts" setup>
import { useModal } from '@/composables/useModal';

defineProps<{
  title: string;
  maxWidth?: string;
  transition?: string | 'dialog-bottom-transition';
}>();

const { close, isOpen } = useModal();

defineEmits(['close']);
</script>

<template>
  <v-dialog v-model="isOpen" :max-width="maxWidth || '500'" :transition="transition">
    <v-card :title="title">
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
        <v-btn text="Close" @click="close"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>