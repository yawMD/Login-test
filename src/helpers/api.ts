

export async function getData(email: string, password: string){
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", options);
    return response;
}