class API {
  getDataFromServer(id = 1) {
    return fetch('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  getFakeData(latency = 200) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Some Fake Data!');
      }, latency);
    });
  }
}
