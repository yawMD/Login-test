

export async function getData(email: string, password: string){
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, password})
    }

    return await fetch("https://jsonplaceholder.typicode.com/posts", options);
}