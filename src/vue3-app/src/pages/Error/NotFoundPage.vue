<template>
    <v-container class="text-center" fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="headline">404 - Page Not Found</v-card-title>
            <v-card-text>
              <v-img
                src="@/assets/images/404.png" 
                alt="404 Not Found"
                max-width="400"
                class="mb-4"
              ></v-img>
              <p>Sorry, the page you are looking for does not exist.</p>
              <v-btn color="primary" to="/">Go to Home</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
