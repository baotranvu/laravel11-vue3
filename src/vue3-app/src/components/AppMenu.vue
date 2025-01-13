<template>
  <v-navigation-drawer v-model="isShowMenu" :temporary="$vuetify.display.mobile" :mobile-breakpoint="720" width="200"
    :location="$vuetify.display.smAndDown ? 'bottom' : 'left'" app>
    <v-list density="compact">
      <v-list-item v-for="item in menuItems" :key="item.routeName" :prepend-icon="item.icon" :title="item.title"
        @click="HandleNaivigation(item.routeName)">
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter()
const globalStore = useGlobalStore()
const { isShowMenu } = storeToRefs(globalStore)
const menuItems = [
  { icon: 'mdi-home-city', title: 'Home', routeName: 'home' },
  { icon: 'mdi-account', title: 'My Account', routeName: 'account' },
  { icon: 'mdi-view-list', title: 'Tasks', routeName: 'tasks' },
];
const HandleNaivigation = async (routeName: string) => {
  try {
    await router.push({ name: routeName })
  } catch (err) {
    console.log(err)
  }
}
</script>