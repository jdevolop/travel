window.onload = () => {

//Application get

    const app = document.querySelector("body");

        app.header = app.querySelector("header");

            app.sections = app.querySelectorAll("section");

        app.footer = app.querySelector("footer");

//    Set Title
    
    document.head.querySelector("title").innerText = config.title;

    document.querySelector(".by").innerText = config.createdBy;

//Set Size

let setsize = () => {
    
    app.style.margin = 0 + "px";

    app.style.padding = 0 + "px";

    app.style.overflowX = "hidden";

//    Header

    size({

        elem: app.header,
        height: 60

    });

//    Sections

    for (let i = 0; i < app.sections.length; i++) {

        if (i != 3) {

            size({

                elem: app.sections[i],
                height: 789

            });

        }

        else {

            size({

                elem: app.sections[i],
                height_dinamic: "min-content"
    
            });

        }

    }

//    Footer

    size({

        elem: app.footer,
        height: 180

    });

    requestAnimationFrame(setsize);

}

    setsize();

const slideTo = (params) => {

    landing.slide({

        duration: params.time,

        slideY: params.elem.offsetTop

    });

}

//    Set Attributes

let welS = app.header.querySelector(".WelcomeSlider"),
    culS = app.header.querySelector(".CultureSlider"),
    mapS = app.header.querySelector(".MapSlider"),
    posS = app.header.querySelector(".PostsSlider"),
    HisS = app.header.querySelector(".HistorySlider");

welS.onclick = () => { slideTo({ elem: app.sections[0], time: 1000 }); }

culS.onclick = () => { slideTo({ elem: app.sections[1], time: 1000 }); }

mapS.onclick = () => { slideTo({ elem: app.sections[2], time: 1000 }); }

posS.onclick = () => { slideTo({ elem: app.sections[3], time: 1000 }); }

HisS.onclick = () => { slideTo({ elem: app.sections[4], time: 1000 }); }

//      Set Effects

effect(app);

//      Map controller


}