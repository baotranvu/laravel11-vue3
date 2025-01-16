<template>
    <v-container class="text-center" fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="headline">500 - Internal Server Error</v-card-title>
            <v-card-text>
              <v-img
                src="@/assets/images/500.png" 
                alt="500 Internal Server Error"
                max-width="400"
                class="mb-4"
              ></v-img>
              <p>Oops! Something went wrong on our end.</p>
              <v-btn color="primary" to="/">Go to Home</v-btn>
              <v-btn color="primary" to="/contact">Contact Support</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>