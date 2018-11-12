//Landing Page 

    const landing = {};

    landing.position = 0;

    landing.slide = (obj) => {

        let animate = ({timing, draw, duration}) => {

            let start = performance.now();
            
            requestAnimationFrame(function animate(time) {

                let timeFraction = (time - start) / duration;

                if (timeFraction > 1) timeFraction = 1

                    let progress = timing(timeFraction)

                    draw(progress); // draw it

                if (timeFraction < 1) {

                    requestAnimationFrame(animate);

                }

            });

        }

        animate({

            duration: obj.duration,

            timing:(timeFraction) => {

                return Math.pow(1 - Math.cos(Math.asin(timeFraction)),1/1.8);

            },

            draw(progress) {

                let Y;

                if (obj.slideY < landing.position) {

                    Y = -(landing.position - obj.slideY) * progress;

                }

                else {

                    Y = (obj.slideY - landing.position) * progress;

                }

                window.scrollBy(0, Y);

                landing.position = window.scrollY;

            }

        });

    }

//Landing Secions Size

    const size = (obj) => {
        
        let sizeX = document.documentElement.clientWidth;

        let sizeY = obj.height;

            obj.elem.style.width = sizeX + "px";

            obj.elem.style.height = sizeY + "px";

            if (obj.height_dinamic != null) { obj.elem.style.height = obj.height_dinamic }

    }

//Landing Effects

    const effect = (app) => {

        let Y;

        let F = 0;

            let getY = () => {

                Y = window.scrollY;

                    if (Y >= 50 && F == 0) {

                        app.header.classList.add("black");

                        F = 1;

                    }

                    if (Y <= 50) {

                        app.header.classList.remove("black");

                        F = 0;

                    }

                requestAnimationFrame(getY);

            }

        getY();

    }
