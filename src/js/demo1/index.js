import { preloadImages } from "../utils";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const gridItems = [...document.querySelectorAll(".grid > .grid__item")];

// Preload images
preloadImages(".grid__item-img").then((_) => {
  document.body.classList.remove("loading");

  // Smooth scrolling initialization (using Lenis https://github.com/studio-freight/lenis)
  const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
  });
  const scrollFn = () => {
    lenis.raf();
    requestAnimationFrame(scrollFn);
  };
  requestAnimationFrame(scrollFn);

  gridItems.forEach((item) => {
    const image = item.querySelector(".grid__item-img");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .set(image, {
        transformOrigin: `${gsap.utils.random(0, 1) > 0.5 ? 0 : 100}% 100%`,
        filter: "brightness(100%) blur(0px)",
        // transform: "translateY(0%)",
      })
      .to(image, {
        ease: "none",
        // opacity: 0,
        filter: "brightness(400%) blur(40px)",
        scale: 0.7,
        // transform: "translateY(-20%)",
      });
  });
});
