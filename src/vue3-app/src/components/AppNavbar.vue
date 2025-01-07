<template>
   <v-app-bar color="primary" :elevation="4" density="compact" :height="64">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>ToDoList</v-app-bar-title>
        <template v-slot:append>
            <v-btn icon="logout" @click="open">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </template>
   </v-app-bar>
   <BaseModal title="Confirm logout" @close="close" transition="dialog-bottom-transition"  >
        <template v-slot:content>
            <p>Are you sure you want to logout?</p>
        </template>
        <template v-slot:actions>
            <v-btn color="primary" @click="confirmLogout">Confirm</v-btn>
        </template>
   </BaseModal>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useModal } from '@/composables/useModal';
import { useRouter } from 'vue-router';
import { VAppBar, VAppBarTitle, VAppBarNavIcon, VBtn, VIcon } from 'vuetify/components';
import BaseModal from '@/components/base/BaseModal.vue';
import { useGlobalStore } from '@/stores/global';
const router = useRouter()
const auth = useAuth()
const globalStore = useGlobalStore()
const {open, close } = useModal();
const confirmLogout = async () => {
    close()
    await auth.logout()
    sessionStorage.clear()
    router.replace({ name: 'login' })
}
const openDrawer = () => {
    globalStore.toggleMenu()
}
</script>
