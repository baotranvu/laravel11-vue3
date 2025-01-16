<template>
  <v-container fluid>
      <v-col cols="12" class="d-flex flex-column align-items-center">
        <h1 class="text-h1">403 - Forbidden</h1>
        <v-img src="/src/assets/images/403.webp" alt="403 Forbidden" max-width="400" :width="400" class="mb-4"/>
        <p>You do not have permission to access this page.</p>
        <v-btn color="primary" to="/">Go to Home</v-btn>
      </v-col>
  </v-container>
</template>