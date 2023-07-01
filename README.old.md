# E-commerce-front-end

```
const response2 = await fetch("http://localhost:8000/api/v1/products", {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
           credentials: "include",
           Authorization: "Bearer " + Cookies.get("jwt"),
         },
       });
       const data2 = await response2.json();
       console.log(data2);

```
