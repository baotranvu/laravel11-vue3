<template>
    <v-app-bar color="primary" :elevation="4" density="compact" :height="64">
        <template v-slot:prepend>
            <v-app-bar-nav-icon icon="mdi-chevron-double-left" @click="globalStore.toggleMenu()" v-if="isShowMenu" />
            <v-app-bar-nav-icon @click="globalStore.toggleMenu()" v-else/>
        </template>
        <v-app-bar-title>ToDoList</v-app-bar-title>
        <template v-slot:append>
            <v-btn @click="openLogoutModal" class="mr-2" id="logout" rounded="xl" size="small">
                <v-icon class="mr-2" icon="mdi-logout"></v-icon>
                Logout
            </v-btn>
            <v-dialog v-model="logoutModal.show" max-width="400" transition="dialog-top-transition" variant="flat">
                <v-card rounded="lg">
                    <v-card-title class="d-flex justify-content-between align-items-center">
                        <div class="text-h5 text-medium-emphasis ps-2">
                            {{ logoutModal.title }}
                        </div>
                        <v-btn icon="mdi-close" variant="text" @click="onCancel"></v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>{{ logoutModal.message }}</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="outlined" color="primary" :loading="isLoading"
                            @click="onConfirm">Confirm</v-btn>
                        <v-btn variant="outlined" color="error" @click="onCancel">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </v-app-bar>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { VAppBar, VAppBarTitle, VAppBarNavIcon, VBtn, VDialog, VCard, VCardTitle, VCardText, VCardActions, VDivider, VSpacer, VIcon } from 'vuetify/components';
import { useGlobalStore } from '@/stores/global';
import type { Modal } from '@/types/Modal';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
const router = useRouter()
const auth = useAuth()
const globalStore = useGlobalStore()
const { isShowMenu } = storeToRefs(globalStore)
const logoutModal: Modal = reactive({
    id: 'logout',
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    activator: '#logout',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    show: false,
});

const onConfirm = async () => {
    await confirmLogout()
},
    onCancel = () => {
        logoutModal.show = false
    }

const openLogoutModal = () => {
    logoutModal.show = true
}

import { ref } from 'vue'
const isLoading = ref(false)

const confirmLogout = async () => {
    try {
        isLoading.value = true
        await auth.logout()
        logoutModal.show = false
        router.push({ name: 'login' })
    } catch (e: any) {
        const error = e?.response?.data ?? { status: 500, message: 'Something went wrong' }
        globalStore.setError({
            status: error.status,
            message: error.message
        })
    } finally {
        isLoading.value = false
    }
}
</script>
