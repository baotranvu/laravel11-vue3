<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="isShowMenu"
        :rail="rail"
        @click="rail = false"
        :temporary="$vuetify.display.mobile"
        :mobile-breakpoint="960"
      >
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="item in menuItems"
            :key="item.routeName"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="router.push({ name: item.routeName })"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <slot name="content"></slot>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>  
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter()
const globalStore = useGlobalStore()
const {isShowMenu} = storeToRefs(globalStore)
const rail = ref(false);
const menuItems = [
  { icon: 'mdi-home-city', title: 'Home', routeName: 'home' },
  { icon: 'mdi-account', title: 'My Account', routeName: 'account' },
  { icon: 'mdi-view-list', title: 'Tasks', routeName: 'tasks' },
];
</script>