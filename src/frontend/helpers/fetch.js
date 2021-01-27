
  export async function getData(url, headers, body, method) {
    let newBody = body || undefined;
    let response = await fetch(url, { 
        headers: headers,
        method: method, 
        body: newBody
       
    });
    const data = await response.json();
    return data;
  }

  export function setHeaders(data) {
    let token = data['access_token'];
    let headers = new Headers({
        'access_token': token
    });

   // headers.append('Content-Type', query('content'));

    return headers;
  }
  