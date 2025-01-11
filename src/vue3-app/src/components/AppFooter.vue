<template>
    <v-footer class="bg-grey-lighten-1" :height="100">
        <v-row justify="center" no-gutters class="d-flex justify-content-center">
            <v-btn v-for="link in links" :key="link" class="mx-2" size="small" rounded="xl" variant="text">
                {{ link }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12">
                {{ new Date().getFullYear() }} — <strong>TodoList</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>
<script setup lang="ts">
const links = [
    'About Us',
    'Team',
    'Services',
    'Blog',
    'Contact Us',
]
</script>