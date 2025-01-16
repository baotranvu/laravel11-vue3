<template>
    <v-footer class="bg-grey-lighten-1" :height="64">
        <v-row justify="center" no-gutters class="d-flex justify-content-center">
            <v-btn v-for="link in links" :key="link.title" :to="{ name: link.routeName }" class="mx-2" size="small" rounded="xl" variant="text">
                {{ link.title }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12">
                {{ new Date().getFullYear() }} — <strong>TodoList</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>
<script setup lang="ts">
interface FooterLink {
    title: string;
    routeName: string;
}
const links: FooterLink[] = [
    { title: 'Home', routeName: 'home' },
    { title: 'About', routeName: 'about' },
    { title: 'Contact', routeName: 'contact' },
    { title: 'FAQ', routeName: 'faq' },
    { title: 'Terms of Service', routeName: 'terms-of-service' },
    { title: 'Privacy Policy', routeName: 'privacy-policy' },
];
</script>