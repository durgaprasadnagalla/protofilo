/* =========================================================
   NAGALLA DURGA PRASAD
   3D PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        document
            .querySelector(".nav-links")
            ?.classList.remove("active");

    });

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {

    if (!cursorGlow) return;

    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   3D TILT CARDS
========================================================= */

const tiltCards =
    document.querySelectorAll(".tilt-card");

tiltCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 768) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";

    });

});


/* =========================================================
   THREE.JS BACKGROUND
========================================================= */

const canvas =
    document.getElementById("three-bg");

const scene =
    new THREE.Scene();


/* CAMERA */

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

camera.position.z = 5;


/* RENDERER */

const renderer =
    new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


/* =========================================================
   PARTICLES
========================================================= */

const particleCount = 900;

const particleGeometry =
    new THREE.BufferGeometry();

const positions =
    new Float32Array(
        particleCount * 3
    );

for (let i = 0; i < particleCount * 3; i++) {

    positions[i] =
        (Math.random() - 0.5) * 16;

}

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);


const particleMaterial =
    new THREE.PointsMaterial({

        color: 0xb7ff3c,

        size: 0.018,

        transparent: true,

        opacity: 0.55,

        blending:
            THREE.AdditiveBlending

    });


const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(particles);


/* =========================================================
   3D WIREFRAME SPHERE
========================================================= */

const sphereGeometry =
    new THREE.IcosahedronGeometry(
        1.7,
        2
    );


const sphereMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xb7ff3c,

        wireframe: true,

        transparent: true,

        opacity: 0.055

    });


const sphere =
    new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
    );


sphere.position.set(
    2.8,
    0.5,
    -1
);

scene.add(sphere);


/* =========================================================
   SECOND 3D OBJECT
========================================================= */

const torusGeometry =
    new THREE.TorusGeometry(
        2.1,
        0.008,
        8,
        120
    );


const torusMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xe8c46a,

        transparent: true,

        opacity: 0.18

    });


const torus =
    new THREE.Mesh(
        torusGeometry,
        torusMaterial
    );


torus.rotation.x =
    Math.PI / 2.5;

torus.position.set(
    -3,
    -1,
    -2
);

scene.add(torus);


/* =========================================================
   MOUSE PARALLAX
========================================================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            (event.clientX /
                window.innerWidth) *
            2 - 1;

        mouseY =
            (event.clientY /
                window.innerHeight) *
            2 - 1;

    }
);


/* =========================================================
   ANIMATION LOOP
========================================================= */

function animate() {

    requestAnimationFrame(animate);


    /* PARTICLES */

    particles.rotation.y += 0.0005;

    particles.rotation.x += 0.00015;


    /* SPHERE */

    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.0015;

    sphere.position.x +=
        (2.8 + mouseX * 0.15 -
            sphere.position.x) * 0.01;

    sphere.position.y +=
        (0.5 - mouseY * 0.15 -
            sphere.position.y) * 0.01;


    /* TORUS */

    torus.rotation.z += 0.001;

    torus.rotation.y += 0.0005;


    /* CAMERA PARALLAX */

    camera.position.x +=
        (mouseX * 0.12 -
            camera.position.x) * 0.02;

    camera.position.y +=
        (-mouseY * 0.12 -
            camera.position.y) * 0.02;


    camera.lookAt(scene.position);


    renderer.render(
        scene,
        camera
    );

}

animate();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navAnchors =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navAnchors.forEach(anchor => {

            anchor.classList.remove(
                "active"
            );

            if (
                anchor.getAttribute(
                    "href"
                ) === `#${current}`
            ) {

                anchor.classList.add(
                    "active"
                );

            }

        });

    }
);