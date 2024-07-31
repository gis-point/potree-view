export const AuthorizationEnpointsEnum = {
  LoadLasFile: "/las_files/client/load/las/file",
  LasFileDetails: (name) => `/las_files/client/las/file/details/${name}`,
  LasFilesList: "/las_files/client/las/files/list",
};
