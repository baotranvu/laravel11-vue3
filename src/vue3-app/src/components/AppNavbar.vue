<template>
    <v-app-bar color="primary" :elevation="4" density="compact" :height="64">
        <template v-slot:prepend>
            <v-app-bar-nav-icon icon="mdi-chevron-double-left" @click="globalStore.toggleMenu()" v-if="isShowMenu" />
            <v-app-bar-nav-icon @click="globalStore.toggleMenu()" v-else />
        </template>
        <v-app-bar-title>ToDoList</v-app-bar-title>
        <template v-slot:append>
            <v-btn @click="openLogoutModal" class="mr-2" id="logout" rounded="xl" size="small">
                <v-icon class="mr-2" icon="mdi-logout"></v-icon>
                Logout
            </v-btn>
            <AppModal :id="logoutModal.id"
                :title="logoutModal.title" :message="logoutModal.message" :handleConfirm="onConfirm"
                :handleCancel="onCancel" />
        </template>
    </v-app-bar>
</template>
<script setup lang="ts">
import AppModal from '@/components/AppModal.vue';
import { useAuth } from '@/composables/useAuth';
import { useModalStore } from '@/stores/modal';
import { useRouter } from 'vue-router';
import { VAppBar, VAppBarTitle, VAppBarNavIcon, VBtn, VIcon } from 'vuetify/components';
import { useGlobalStore } from '@/stores/global';
import { useAuthStore } from '@/stores/auth';
import type { Modal } from '@/types/Modal';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
const router = useRouter()
const auth = useAuth()
const globalStore = useGlobalStore()
const { isShowMenu } = storeToRefs(globalStore)
const authStore = useAuthStore()
const modalStore = useModalStore()
const logoutModal: Modal = reactive({
    id: 'logout',
    title: 'Logout',
    message: `Are you sure you want to logout ${authStore.getUserName}?`,
});

const openLogoutModal = () => {
    modalStore.openModal(logoutModal)

};

const onConfirm = () => {
    confirmLogout()
    modalStore.closeModal(logoutModal.id)
}
const onCancel = () => {
    modalStore.closeModal(logoutModal.id)
}




const confirmLogout = async () => {
    try {
        await auth.logout()
        router.push({ name: 'login' })
    } catch (e: any) {
        const error = e?.response?.data ?? { status: 500, message: 'Something went wrong' }
        globalStore.setError({
            status: error.status,
            message: error.message
        })
    } finally {
        modalStore.closeModal(logoutModal.id)
    }
}
</script>
