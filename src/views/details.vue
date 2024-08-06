<script setup>

import { GeneralSocketWorkerInstance } from "../workers/web-socket-worker";

import { onMounted } from "vue";

import { useRoute } from "vue-router";

import { API } from "../workers/api-worker/api.worker";

const route = useRoute();

onMounted(async () => {
  setTimeout(async () => {
    window.viewer = new Potree.Viewer(
      document.getElementById("potree_render_area")
    );

    viewer.setEDLEnabled(true);
    viewer.setFOV(10);
    viewer.setPointBudget(2_000_000);
    viewer.loadSettingsFromURL();

    viewer.setDescription("Loading Octree of LAS files");

    viewer.loadGUI(() => {
      viewer.setLanguage("en");
      $("#menu_appearance").next().show();
    });
    const response = await API.AuthorizationService.LasFileDetails(
      route.params.name
    );

    response.data.all_splited_and_converted_folders_paths
      .map((folderPath) => {
        return `${response.data.absolute_converted_las_files_base_path}/${folderPath}/metadata.json`;
      })
      .forEach((folderPath) => {
        loadPointCloud(folderPath);
      });
  }, 2000);
});

const handleMessageGeneral = (instance) => {
  loadPointCloud(`${instance.data.folder_url}/metadata.json`);
};

const loadPointCloud = async (metaDataFile) => {
  await window.Potree.loadPointCloud(metaDataFile, "lion", async function (e) {
    viewer.scene.addPointCloud(e.pointcloud);

    let material = e.pointcloud.material;
    material.size = 1;
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

    e.pointcloud.position.x += 3;
    e.pointcloud.position.y -= 3;
    e.pointcloud.position.z += 4;

    viewer.fitToScreen();
  });
};

try {
  GeneralSocketWorkerInstance.registerCallback(handleMessageGeneral).connect();
} catch {}
</script>

<template>
  <div
    class="potree_container"
    style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px"
  >
    <div id="potree_render_area"></div>
    <div id="potree_sidebar_container"></div>
  </div>
</template>

<style scoped></style>
../../public/assets/potree/libs/three.js/build/three.module.js
