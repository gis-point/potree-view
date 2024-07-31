import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";

export class AuthorizationService {
  static LoadLasFile(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.LoadLasFile, data);
  }
  static LasFileDetails(name) {
    return AxiosInstance.get(EndpointsEnum.Authorization.LasFileDetails(name));
  }
  static LasFilesList() {
    return AxiosInstance.get(EndpointsEnum.Authorization.LasFilesList);
  }
}
