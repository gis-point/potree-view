<script setup>
import { ref } from "vue";
import {
  VBtn,
  VInput,
  VForm,
  VSelect,
  VTextarea,
  VContainer,
  VRow,
  VCol,
} from "vuetify/components";

import { useRouter } from "vue-router";

import { API } from "../workers/api-worker/api.worker";

import { onMounted, watch } from "vue";

// Create a reactive variable to manage the input value
const lasFile = ref("");
const countOfSplits = ref(null);

const router = useRouter();

// Create a reactive variable to manage the error state
const error = ref(false);

// Mock data for the dropdown
const uploadedFiles = ref();

const alreadyUploaded = ref();

const goToDetailsPage = (fileName) => {
  router.push(`/details/${fileName}`);
};

// Function to handle the form submission
const handleSubmit = async () => {
  if (!lasFile.value) {
    error.value = true;
  } else {
    error.value = false;

    try {
      const response = await API.AuthorizationService.LoadLasFile({
        file_url: lasFile.value,
        custom_splits_count: countOfSplits.value,
      });
      goToDetailsPage(response.data.name);
    } catch {}
  }
};

onMounted(async () => {
  const response = await API.AuthorizationService.LasFilesList();
  uploadedFiles.value = response.data.results.map((item) => item.name);
});

watch(
  () => alreadyUploaded.value,
  () => {
    goToDetailsPage(alreadyUploaded.value);
  }
);
</script>

<template>
  <VContainer class="container">
    <VRow class="center-content">
      <VCol cols="12" sm="8" md="6" lg="4">
        <VForm>
          <VTextarea
            v-model="lasFile"
            label="Upload a link to your las file"
            :error="error"
            :error-messages="error ? 'This field is required' : ''"
            outlined
            dense
            class="mb-4"
          ></VTextarea>

          <VBtn @click="handleSubmit" color="primary" class="mb-4">Submit</VBtn>
        </VForm>

        <div class="select-files">
          <span>Or select from already uploaded:</span>
          <VSelect
            :items="uploadedFiles"
            label="Select file"
            outlined
            dense
            v-model="alreadyUploaded"
          ></VSelect>
        </div>

        <VTextarea
          v-model="countOfSplits"
          label="Count of splits"
          outlined
          dense
          class="mb-4"
        ></VTextarea>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.select-files {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
