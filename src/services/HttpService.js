import { SERVER_ROUTES } from '../routes';
import { TOKEN_FIELDS_NAMES } from '../constants/login';
import LocalStorage from '../util/localStorage';

export default class HttpService {
  // static failedRequests = [];
  static isRefreshed = false;
  static refreshing = Promise.reject();

  static request = ({ url, method = 'GET', body, headers = {} }) => {
    const options = {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          TOKEN_FIELDS_NAMES.ACCESS_TOKEN
        )}`,
        ...headers,
      },
    };

    return fetch(`${url}`, options).then((response) =>
      this.parse(
        {
          url,
          method,
          body,
          headers,
        },
        response
      )
    );
  };

  static get = (url) => {
    return this.request({ url });
  };

  static post = (url, body) => {
    return this.request({ url, method: 'POST', body: JSON.stringify(body) });
  };

  static delete = (url) => {
    return this.request({ url, method: 'DELETE' });
  };

  static patch = (url, body) => {
    return this.request({ url, method: 'PATCH', body: JSON.stringify(body) });
  };

  static parse = (request, response) => {
    if (response.ok) {
      return response.json().then((data) => data);
    }

    if (
      response.status === 401 &&
      response.url !== SERVER_ROUTES.AUTH.REFRESH_TOKEN
    ) {
      if (!this.isRefreshed) {
        return this.request({
          url: SERVER_ROUTES.AUTH.REFRESH_TOKEN,
          method: 'POST',
          headers: {
            'Refresh-Token': localStorage.getItem(
              TOKEN_FIELDS_NAMES.REFRESH_TOKEN
            ),
          },
        }).then((data) => {
          this.isRefreshed = false;

          LocalStorage.setItems(data);

          this.refreshing = Promise.resolve();

          return this.request(request).then((data) => data);
        });
      }

      this.isRefreshed = true;

      return this.refreshing.then(() =>
        this.request(request).then((data) => data)
      );
    }

    // if (
    //   response.status === 401 &&
    //   response.url !== SERVER_ROUTES.AUTH.REFRESH_TOKEN
    // ) {
    //   return this.request({
    //     url: SERVER_ROUTES.AUTH.REFRESH_TOKEN,
    //     method: 'POST',
    //     headers: {
    //       'Refresh-Token': localStorage.getItem(
    //         TOKEN_FIELDS_NAMES.REFRESH_TOKEN
    //       ),
    //     },
    //   }).then((data) => {
    //     this.isRefreshing = false;
    //     // LocalStorage.setItems(data);

    //     // return this.request(request).then((data) => {
    //     //   return data;
    //     // });
    //   });

    //   if (!this.isRefreshing) {

    //   }
    // }

    // if (
    //   response.status === 401 &&
    //   response.url !== SERVER_ROUTES.AUTH.REFRESH_TOKEN
    // ) {
    //   this.failedRequests.push(request);

    //   if (!this.isRefreshing) {
    //     this.request({
    //       url: SERVER_ROUTES.AUTH.REFRESH_TOKEN,
    //       method: 'POST',
    //       headers: {
    //         'Refresh-Token': localStorage.getItem(
    //           TOKEN_FIELDS_NAMES.REFRESH_TOKEN
    //         ),
    //       },
    //     })
    //       .then((data) => {
    //         this.isRefreshing = false;
    //         LocalStorage.setItems(data);

    //         this.failedRequests.map((failedRequest) => {
    //           this.request(failedRequest);
    //         });
    //       })
    //       .catch(() => {
    //         LocalStorage.removeItems(TOKEN_FIELDS_NAMES);
    //         window.location.href = './login';
    //       });
    //   }

    //   this.isRefreshing = true;
    // }

    return response.json().then((data) => Promise.reject(data));
  };
}
