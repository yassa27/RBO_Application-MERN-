import http from "../common/http";

class PurchaserequestDataService {
  getAll() {
    return http.get("/purchaserequests");
  }
  get(id) {
    return http.get(`/purchaserequests/${id}`);
  }
  create(data) {
    return http.post("/purchaserequests", data);
  }
  update(id, data) {
    return http.put(`/purchaserequests/${id}`, data);
  }
  delete(id) {
    return http.delete(`/purchaserequests/${id}`);
  }
  deleteAll() {
    return http.delete(`/purchaserequests`);
  }
  findByTitle(title) {
    return http.get(`/purchaserequests?title=${title}`);
  }
}
export default new PurchaserequestDataService();