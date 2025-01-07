<template>
   <v-app-bar color="primary" :elevation="4" density="compact" :height="64">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>ToDoList</v-app-bar-title>
        <template v-slot:append>
            <v-btn icon="logout" @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </template>
   </v-app-bar>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { VAppBar, VAppBarTitle, VAppBarNavIcon, VBtn, VIcon } from 'vuetify/components';
import { useGlobalStore } from '@/stores/global';
const router = useRouter()
const auth = useAuth()
const globalStore = useGlobalStore()
const logout = async () => {
    if( confirm('Are you sure you want to logout?')){
        await auth.logout()
        sessionStorage.clear()
        router.replace({ name: 'login' })
    }
}
const openDrawer = () => {
    globalStore.toggleMenu()
}
</script>

<style scoped>
.logo {
    background-image: url('/favicon.ico');
    background-size: contain;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
}
</style>
