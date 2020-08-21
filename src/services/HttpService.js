export class HttpService {
  static request = (url, method = 'GET', body) => {
    const options = {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return fetch(`http://localhost:3000/${url}`, options).then(this.parse);
  };

  static get = (url) => {
    return this.request(url);
  };

  static post = (url, body) => {
    return this.request(url, 'POST', JSON.stringify(body));
  };

  static parse = (response) => {
    if (response.ok) {
      return response.json().then((data) => data);
    }
  };
}
