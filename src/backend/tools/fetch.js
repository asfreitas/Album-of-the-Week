const fetch = require('node-fetch');

// standard fetch wrapper
async function getData(url, headers = undefined, body = undefined, method) {
  try{
    let response = await fetch(url, { 
      headers: headers,
      method: method, 
      body: body
  });
  const data = await response.json();
  return data;

  }
  catch(error) {
    console.log("Fetch error: " + error);
  }

}



exports.getData = getData;