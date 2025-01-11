<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="isShowMenu"
        :temporary="$vuetify.display.mobile"
        :mobile-breakpoint="720"
        width="200"
        :location="$vuetify.display.smAndDown ? 'bottom' : 'left'"
      >
        <v-divider></v-divider>
        <v-list id="menu-list">
          <v-list-item
            id="menu-list-item"
            v-for="item in menuItems"
            :key="item.routeName"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="router.push({ name: item.routeName })"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <div style="width: calc(100%)">
        <slot name="content"></slot>
      </div>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>  
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter()
const globalStore = useGlobalStore()
const {isShowMenu} = storeToRefs(globalStore)
const menuItems = [
  { icon: 'mdi-home-city', title: 'Home', routeName: 'home' },
  { icon: 'mdi-account', title: 'My Account', routeName: 'account' },
  { icon: 'mdi-view-list', title: 'Tasks', routeName: 'tasks' },
];
</script>