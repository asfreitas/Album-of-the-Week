const fetch = require('node-fetch');

// standard fetch wrapper
async function getData(url, headers = undefined, body = undefined, method) {
  let response;
  try{
      response = await fetch(url, { 
        headers: headers,
        method: method, 
        body: body
  });
  }
  catch(error) {
    console.log("Fetch error: " + error);
  }

  const data = await response.json();

  return data;
}



exports.getData = getData;