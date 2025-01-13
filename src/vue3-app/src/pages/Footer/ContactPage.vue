<template>
    <Applayout>
        <template v-slot:default>
            <div class="d-flex flex-column align-items-center justify-content-center p-4">
                <h1>Contact Us</h1>
                <p>
                    If you have any questions or feedback, please don't hesitate to
                    contact us.
                </p>
            </div>
        </template>
    </Applayout>
</template>

<script lang="ts" setup>
import Applayout from '@/components/AppLayout.vue';
</script>