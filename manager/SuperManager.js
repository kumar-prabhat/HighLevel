class SuperManager {
  body;
  params;
  headers;
  query;

  constructor(req = null) {
    this.req = req;
  }

  /**
   * @param {{ body: any; params: any; query: any; headers: any; }} _req
   */
  set req(_req) {
    this.body = _req?.body;
    this.params = _req?.params;
    this.query = _req?.query;
    this.headers = _req?.headers;
  }
}

module.exports = SuperManager;
