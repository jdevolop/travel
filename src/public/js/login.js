let send = () => {
    
    let login = document.querySelector("#login");
    
    let password = document.querySelector("#password");
    
    let xhttp = new XMLHttpRequest();
    
        const data = {
            login: login.value,
            password: password.value
        }
        xhttp.onreadystatechange = () => {
            
            if (xhttp.status = 200 && xhttp.readyState == 4) {
                
                const { data } = JSON.parse(xhttp.response);

                localStorage.setItem('auth', data);

                window.open('/admin');
                
            }
            
        }
        
        xhttp.open('POST', '/api/login');
        xhttp.setRequestHeader('Content-Type', 'application/json');
    
        xhttp.send(JSON.stringify(data));
}