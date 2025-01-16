<template>
  <v-container fluid>
      <v-col cols="12" class="d-flex flex-column align-items-center">
        <h1 class="text-h1">404 - Not Found</h1>
        <v-img src="/src/assets/images/404.webp" alt="404 Not Found" max-width="400" :width="400" class="mb-4"/>
        <p>The page you are looking for does not exist.</p>
        <v-btn color="primary" to="/">Go to Home</v-btn>
      </v-col>
  </v-container>
</template>