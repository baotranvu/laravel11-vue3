<script setup lang="ts">
import IconPencil from '../icons/IconPencil.vue';

interface Props {
    onClick?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
    onClick: undefined
});

function handleClick(): void {
    if (props.onClick) {
        props.onClick();
    }
}
</script>

<template>
    <button 
        class="btn btn-sm btn-circle btn-outline-secondary me-1" 
        @click="handleClick"
    >
        <IconPencil />
    </button>
</template>