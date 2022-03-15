import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FoodyuhApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FoodyuhApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get auth token or get denied; works */
  static async login(username, password) {
    let res = await this.request(
      `auth/token`,
      {
        username: username,
        password: password,
      },
      'post'
    );

    return res.token;
  }

  /** Signup and return token */
  static async register(userObj) {
    let res = await this.request(`auth/register`, userObj, 'post');
    return res.token;
  }

  /** Get the current user */
  static async getCurrentUser(username) {
    let res = await this.request(`users/user/${username}`);
    return res.user;
  }

  /** Get multiple fdcapi generated food matches */
  static async searchForFoods(search) {
    let res = await this.request(`fdcapi/foods/${search}`);
    return res.foodRes;
  }

  /** Get info on a single food by its fdcId */
  static async getFoodbyFdcId(fdcId) {
    let res = await this.request(`fdcapi/fdcid/${fdcId}`);
    return res.food;
  }

  /** Get images of foods */
  static async getImages(search) {
    let res = await this.request(`fdcapi/pexels/${search}`);
    return res.response.photos;
  } 

  /** Alert current loggedin user's info.
   * User can only change { firstName, lastName, password, email } = infoObj
   */
  static async editUserInfo(username, infoObj) {
    let res = await this.request(`users/${username}`, infoObj, 'patch');
    return res.user;
  }

  /** Adds a plate */
  static async addPlate(name, description) {
    let res = await this.request(`plates`, {name, description}, 'post');
    return res.plate;
  }

  /** Get info on specific plate */
  static async getPlate(plateId) {
    let res = await this.request(`plates/${plateId}`);
    return res.plate;
  }

  /** Add food to specific plate */
  static async addFood(fdcId, plateId) {
    let res = await this.request(`plates/${plateId}`, {fdcId: fdcId.toString() }, 'post');
    return res.plate;
  }

  /** Delete food from specific plate 
   * fdcId must be text not integer
   * ;works
  */
  static async deleteFood(fdcId, plateId) {
    let res = await this.request(`plates/${plateId}`, {fdcId: fdcId.toString() }, 'delete');
    return res.plate;
  }

  /** Delete plate */
  static async deletePlate(plateId) {
    let res = await this.request(`plates/delete/${plateId}`, {}, 'delete');
    return res.deletedPlate;
  }
}

export default FoodyuhApi;
