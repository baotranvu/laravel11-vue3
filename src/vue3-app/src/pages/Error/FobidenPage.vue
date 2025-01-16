<template>
    <v-container class="text-center" fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="headline">403 - Forbidden</v-card-title>
            <v-card-text>
              <v-img
                src="@/assets/images/403.png" 
                alt="403 Forbidden"
                max-width="400"
                class="mb-4"
              ></v-img>
              <p>You do not have permission to access this page.</p>
              <v-btn color="primary" to="/">Go to Home</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  </script>