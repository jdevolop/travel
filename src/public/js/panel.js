let items = [];

let editPost = (id) => {
    
    let xhttp = new XMLHttpRequest();
    
        let elem = document.querySelector(`#${ id }`);
    
        const data = {
            title: 'edit',
            body: 'edited'
        }

        xhttp.onreadystatechange = () => {
            
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                
                elem.style.opacity = "0.5";
                
            }
        }
    
        xhttp.open("PUT", "https://touz.herokuapp.com/api/post/"+id, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.setRequestHeader('Authorization', localStorage.getItem('auth'));
    
        xhttp.send(JSON.stringify({ title, body }));
    
}

let deletePost = (id) => {
    
    let xhttp = new XMLHttpRequest();
    
        let elem = document.querySelector(`#${ id }`);
    
        xhttp.onreadystatechange = () => {
            
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                
                elem.style.display = "none";
                
            }
        }
    
        xhttp.open("DELETE", "https://touz.herokuapp.com/api/post/rm", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.setRequestHeader('Authorization', localStorage.getItem('auth'));
    
        xhttp.send(JSON.stringify({ id }));
    
}

let addPost = () => {
    
    let img = document.querySelector("#img");
    
    let title = document.querySelector("#title");
    
    let text = document.querySelector("#text");
    
    if (img.files.length != 0 && title.value != "" && text.value != "") {
            
            let request = new XMLHttpRequest();
            
                request.onreadystatechange = () => {
                    
                    if (request.status == 200 && request.readyState == 4) {
                        
                        const { id } = JSON.parse(request.response);

                        let data = new FormData();

                        data.append('postImage', img.files[0]);
                        data.append('id', id);

                        let request = new XMLHttpRequest();

                            request.onreadystatechange = () => {

                                if(request.readyState == 4 && request.status == 200){

                                    getPost();

                                }

                            };

                            request.open('POST', 'https://touz.herokuapp.com/admin/upload', true);
                            request.setRequestHeader('Authorization', localStorage.getItem('auth'));

                            request.send(data);

                    }
                    
                    
                }
                
            request.open("POST", 'https://touz.herokuapp.com/api/post/add', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Authorization', localStorage.getItem('auth'));
        
            console.log(localStorage.getItem('auth'));


            request.send(JSON.stringify({ title:title.value, body:text.value }));    
        
        }
        

    
}

let getPost = () => {
    
    let xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = () => {
            
            if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
                
                let info = JSON.parse(xhttp.response).data;
                
                for (let i = 0; i < info.length; i++) {}
                
                items[items.length] = info[i].id;
                
                let item = document.createElement("figure");
                
                    item.classList.add("item");
                
                    item.setAttribute("id",info[i].id);
                
                let background = document.createElement("div");
                
                    background.classList.add("background");
                
                    background.style.backgroundImage = `url(${ info[i].image })`;
                
                item.appendChild(background);
                
                let text = document.createElement("div");
                
                    text.classList.add("text");
                
                item.appendChild(text);
                
                let hT = document.createElement("h3");
                
                    let title = document.createElement("label");

                        title.classList.add("title");
                
                        title.innerHTML = info[i].title;
                
                    hT.appendChild(title);
                
                    let tools = document.createElement("label");

                        tools.classList.add("tools");
                
                            let a = document.createElement("div");
                
                                a.classList.add("a");
                
                                b.setAttribute("edit",info[i].id);
                
                                b.setAttribute("onclick","editPost(this.edit)");
                
                            tools.appendChild(a);
                
                            let b = document.createElement("div");
                
                                b.classList.add("b");
                
                                b.setAttribute("delete",info[i].id);
                
                                b.setAttribute("onclick","deletePost(this.delete)");
                
                            tools.appendChild(b);
                
                    hT.appendChild(tools);
                
                text.appendChild(hT);
                
                let br = document.createElement("br");
                
                text.appendChild(br);
                
                let p = document.createElement("p");
                
                p.innerHTML = info[i].body;
                
                text.appendChild(p);
                
                let main = document.querySelector("section.interface");
                
                main.innerHTML = null;
                
                let ctx = main.querySelector("section");
                
                ctx.appendChild(item);
                
            }
        }
    
    xhttp.open("GET", "https://touz.herokuapp.com/api/post/", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('Authorization', localStorage.getItem('auth'));
    
        

    xhttp.send(null);
}