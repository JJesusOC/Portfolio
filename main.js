// GSAP Hero Animation
gsap.from("#hero h1", { y: -50, opacity: 0, duration: 1 });
gsap.from("#hero p", { y: 50, opacity: 0, duration: 1.2, delay: 0.5 });

// Three.js Setup
const canvas = document.getElementById("threeCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Adding Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Load a 3D Model
const loader = new THREE.GLTFLoader();
loader.load(
  "path/to/your/model.glb", // Replace with your 3D model path
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, -1, 0);
    scene.add(model);

    // Animate Model
    gsap.to(model.rotation, {
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  },
  undefined,
  (error) => {
    console.error("An error occurred loading the model:", error);
  }
);

// Responsive Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Interactive Mouse Movement
document.addEventListener("mousemove", (event) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  gsap.to(camera.rotation, {
    x: mouseY * 0.1,
    y: mouseX * 0.1,
    duration: 0.5,
    ease: "power2.out",
  });
});

// Animate the Scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// GSAP Scroll Animation
gsap.registerPlugin(ScrollTrigger);

gsap.from("#about h2", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    end: "top 60%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
});

gsap.from(".project", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 90%",
    end: "top 70%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  stagger: 0.3,
});

// Hover Effects on Projects
const projectCards = document.querySelectorAll(".project");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { scale: 1.05, duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { scale: 1, duration: 0.3 });
  });
});
