export default class ParamsBuilder {
  constructor(initialQuery = '') {
    const sanitizedinitialQuery = initialQuery.endsWith('/')
      ? initialQuery.slice(0, -1)
      : initialQuery;

    this.#query = `${sanitizedinitialQuery}${this.#query}`;
  }

  #query = '/?';

  get query() {
    return this.#query;
  }

  buildOne(name, value) {
    this.#query += `${name}=${value}&`;
  }

  build(params = [{ name: '', value: '' }]) {
    params.map((p) => {
      this.#query += `${p.name}=${p.value}&`;
    });
  }
}
