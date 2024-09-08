import SVGLogo from '../logo';
import Wechat from '../assets/wechat.svg';
import Douyin from '../assets/douyin.svg';
import backgroundImage from '../assets/1080.jpg';
import { onMount, createSignal } from "solid-js";
//
// –––––– NAV STATES
//
const initNavStateToggle = () => {
    const navToggles = document.querySelectorAll("[data-nav-toggle]");
    if (navToggles.length > 0) {
      const toggleNavbar = () => {
        const navbarWrap = document.querySelector(".navbar_wrap");
        if (navbarWrap) {
          const isFullscreen = navbarWrap.getAttribute("fullscreen") === "true";
          navbarWrap.setAttribute("fullscreen", !isFullscreen);
        }
      };
  
      navToggles.forEach((navToggle) => {
        gsap.to(navToggle, {
          scrollTrigger: {
            trigger: navToggle,
            start: "top top+=5%",
            onEnter: toggleNavbar,
            onLeaveBack: toggleNavbar,
          },
        });
      });
    }
};
//
// –––––– MENU
//
const initNav = (menuWrapper, navWrapper, navTrigger) => {
    let menuBgLines = menuWrapper.querySelectorAll(".line");
    let menuFade = menuWrapper.querySelectorAll("#socials");
    let menuHeadings = menuWrapper.querySelectorAll(".h-nav");
    let isDarkMode = navWrapper.getAttribute("mode") === "dark";
    let isFullscreen = navWrapper.getAttribute("fullscreen") === "true";
    let isMobile = window.innerWidth < 480;
    let menuOpen = false;
    function chunk(arr, size) {
      let result = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(Array.from(arr).slice(i, i + size));
      }
      return result;
    }
    const menuBgLineChunks = chunk(menuBgLines, 5);
    gsap.set(menuHeadings, { y: "100%" });
    gsap.set(menuFade, { opacity: 0, y: "50%" });
  
    const menuAnimation = gsap.timeline({
      defaults: {
        ease: "expo.out",
        duration: 0.5,
      },
    });
  
    const openNav = () => {
      menuOpen = true;
      menuAnimation.clear();
      menuAnimation.progress(0);
      const lineChunckOpen = gsap.timeline();
      menuBgLineChunks.forEach((chunk, i) => {
        lineChunckOpen.to(
          chunk,
          {
            y: "0vh",
            duration: 0.8,
            ease: "power4.out",
            stagger: {
              amount: 0.1,
              from: "random",
            },
          },
          i * 0.15,
        );
      });
      menuAnimation
        .set(menuWrapper, {
          display: "block",
        })
        .to(menuBgLines, {
          y: "0vh",
          ease: "power4.out",
          duration: 0.8,
          stagger: { amount: 0.6, from: "start" },
          onStart: () => {
            menuBgLineChunks.forEach((chunk) => {
              chunk.forEach((line) => {
                gsap.set(line, {
                  y: `${gsap.utils.random(100, 125)}vh`,
                });
              });
            });
          },
        })
        .to(
          ".page",
          {
            scale: 0.92,
            duration: 1,
          },
          0,
        )
        .to(
          ".nav_trigger",
          {
            height: "3.2rem",
            x: isMobile ? "2.2vw" : "0rem",
            duration: 0.5,
            ease: "power2.inout",
          },
          0,
        )
        .to(
          ".nav_line.is-top",
          {
            background: "white",
            rotateZ: 45,
            y: "0.18rem",
          },
          0.1,
        )
        .to(
          ".nav_line.is-bottom",
          {
            background: "white",
            rotateZ: -45,
            y: "-0.2rem",
          },
          0.1,
        ).to(
          menuHeadings,
          {
            y: "0%",
            stagger: 0.02,
            duration: 0.5,
          },
          0,
        )
        .to(
          menuFade,
          {
            y: "0%",
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
          },
          "<",
        )
        .to(
          ".navbar_inner",
          {
            background: isDarkMode ? "#000" : "transparent",
            color: "white",
          },
          "<-=0.1",
        )
        .to(
          ".nav_trigger",
          {
            height: "3.2rem",
            duration: 0.2,
          },
          "<",
        )
    };
  
    const closeNav = () => {
      menuOpen = false;
      menuAnimation.clear();
      menuAnimation.progress(0);
      let innerBg;
      if (isDarkMode) {
        innerBg = "#181618";
      } else {
        innerBg = "efefeb";
      }
      menuAnimation
        .to(
          menuBgLines,
          {
            y: "100vh",
            duration: 0.5,
            overwrite: true,
            ease: "equalizerOut",
            stagger: { amount: 0.1, from: "random" },
          },
          0,
        )
        .to(
          ".page",
          {
            scale: 1,
            duration: 1.2,
            clearProps: "all"
          },
          0,
        )
        .to(
          ".navbar_inner",
          {
            borderColor: "black",
            background: "white",
            clearProps: "all",
          },
          0,
        )
        .to(
          ".nav_trigger",
          {
            height: "2.4rem",
            x: isMobile ? "0vw" : "0rem",
            duration: 0.5,
            ease: "power2.inout",
          },
          0,
        )
        .to(
          ".nav_line.is-top",
          {
            background: "#052e16",
            rotateZ: 0,
            y: "0rem",
          },
          0.1,
        )
        .to(
          ".nav_line.is-bottom",
          {
            background: "#052e16",
            rotateZ: 0,
            y: "0rem",
          },
          0.1,
        )
        .to(
          menuHeadings,
          {
            y: "100%",
            duration: 0.2,
            stagger: 0.02,
          },
          0,
        )
        .to(
          menuFade,
          {
            y: "50%",
            opacity: 0,
            stagger: { each: 0.05, from: "end" },
            duration: 0.6,
          },
          0,
        )
        .to(
          ".nav_trigger",
          {
            borderColor: isDarkMode
              ? "#efefeb"
              : isFullscreen
                ? "efefeb"
                : "#181618",
            duration: 0.2,
          },
          0,
        )
        .to(
          ".nav_line",
          {
            background: isDarkMode
              ? "#efefeb"
              : isFullscreen
                ? "#efefeb"
                : "181618",
          },
          0,
        )
        .set(menuWrapper, {
          display: "none",
        });
    };
  
    navTrigger.addEventListener("click", () => {
      if (menuOpen) {
        isFullscreen = navWrapper.getAttribute("fullscreen") === "true";
        closeNav();
        navWrapper.classList.remove("open");
      } else {
        let navInner = navWrapper.querySelector(".navbar_inner");
        navWrapper.classList.add("open");
        openNav();
      }
    });

};
//
// –––––– MARQUEES
//
const initMarquees = () => {
  function splitMarqueeText() {
    let marqueeSplit = new SplitType("[data-split-text]", {
      types: "words, chars",
    });
  }
  splitMarqueeText();

  // ————— MARQUEE
  const marqueeLoop = gsap.timeline({
    repeat: -1,
    paused: true,
    onComplete: () => {
      gsap.set(".marquee-panel", { xPercent: 0 });
    },
  });
  marqueeLoop.to(".marquee-panel", {
    xPercent: -100,
    duration: 40,
    ease: "none",
  });

  gsap.utils.toArray(".marquee").forEach((section, index) => {
    const marqueePanels = section.querySelectorAll(".marquee-bg__panel");
    let marqueeLetters = section.querySelectorAll(".char");

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => marqueeLoop.play(),
      onEnterBack: () => marqueeLoop.play(),
    });

    const marqueeIntro = gsap.timeline({
      paused: true,
      defaults: {
        ease: "expo.out",
        duration: 1.5,
      },
      onStart: () => marqueeLoop.play(),
    });

    marqueeIntro
      .to(marqueePanels, {
        scale: 1.05,
        x: 0,
        overwrite: true,
        stagger: { each: 0.01 },
      })
      .to(
        ".marquee-bg",
        {
          scale: 1,
          x: "0%",
        },
        0,
      )
      .fromTo(
        marqueeLetters,
        { x: "300%", opacity: 1, fontWeight: 400},
        {
          x: "0%",
          opacity: 1,
          //ease: "power2.out",
          duration: 1,
          fontWeight: 800,
          stagger: { each: 0.05 },
        },
        0,
      );

    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      markers: false,
      onEnter: () => marqueeIntro.play(),
    });
  });
};


export default function Home() {

    const urlsTop = [
      {poster: '/src/assets/imgs/s1.jpg',  url: '/src/assets/videos/p1_smaller.mp4' , title: '有机草莓', subtitle: "有机之选，甜美之选，草莓的自然味道。" },
      {poster: '/src/assets/imgs/s3.jpg',  url: '/src/assets/videos/main_smaller.mp4' , title: '精选食品', subtitle: "精挑细选的有机食材，安全、美味、零负担。" },
      {poster: '/src/assets/imgs/s2.jpg',  url: '/src/assets/videos/p3_smaller.mp4', title: '绿色自然', subtitle: "每一口都是大自然的恩赐，绿色健康好选择" },
    ]
  
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);
    const [activeIndex, setActiveIndex] = createSignal(null);

    let menuWrapper;
    let navWrapper;
    let navTrigger;
  
    
    onMount(() => {
        CustomEase.create("load", "0.46, 0.03, 0, 1");
        let animationElements = document.querySelectorAll("[data-loader-lottie]"),animations = [];
        animationElements.forEach( (e, o) => {
          let a = lottie.loadAnimation({
              container: e,
              renderer: "canvas",
              loop: false,
              autoplay: false,
              path: e.getAttribute("data-animation-path")
          });
          a.addEventListener("DOMLoaded", function() {
              let o = parseFloat(e.getAttribute("data-animation-speed"));
              a.setSpeed(o)
          }),
          animations.push(a)
        });
    
      const isMobile = window.innerWidth < 480;
      let loadWrapper = document.querySelector(".loader"),
      loaderBottomItems = document.querySelectorAll("[data-load-bottom]"),
      borders = document.querySelectorAll('[data-load-border]'),
      loadHero = document.querySelector("[data-load-hero]"), 
      loadHeroOverlay = document.querySelector("[data-load-hero-overlay]"), 
      loadHeroBg = document.querySelector("[data-load-hero-bg]"), 
      loadHeroContent = document.querySelector("[data-load-hero-content]"), 
      loadHeroFade = document.querySelectorAll("[data-hero-fade]"), 
      loadCenterShape = document.querySelector("[data-load-center-x]"), 
      loadReveal = document.querySelector("[data-load-reveal]");

    (gsap.timeline({
        defaults: {
            ease: "load",
        },
        onComplete() {
            gsap.set(loadWrapper, {
                display: "none"
            }),     
            initNav(menuWrapper, navWrapper, navTrigger);
            initMarquees()
          }
    })).to(loaderBottomItems, {
        opacity: 1,
        y: 0,
        stagger: {
            each: .1,
            from: "center"
        }
    }).to("[data-load-logo]", {
        opacity: 1,
        stagger: {
            each: .1
        }
    }, 0).add( () => {
        animations.forEach( (e, o) => {
            gsap.to({}, {
                onComplete() {
                    e.play()
                }
            })
        }
        )
    }
).set(".load-o-lottie", {
    visibility: "hidden"
}, 1.7).to(borders, {
    rotation: 90,
    duration: 0.5,
    ease: 'none',
    stagger: 0.5 
  }, "<").to(loadCenterShape, {
        rotate: 180,
        duration: .8,
        onStart() {
            gsap.set(loadHero, {
                rotate: 90
            }),
            gsap.set(loadHeroBg, {
                rotate: 0,
                yPercent: -3,
                scale: 1.08
            }),
            gsap.set(loadHeroContent, {
                rotate: 0
            })
        },
        onComplete() {
            gsap.set(loadReveal, {
                display: "none"
            }),
            gsap.set(loadHero, {
                opacity: 1
            })
        }
    }, ">+=0.2").to(borders, {
      scaleX: isMobile ? 50 : 40,
      scaleY: isMobile ? 80 : 40,
      duration: 1.6,
      z: 1,
      stagger: {
          each: .01,
          from: "end"
      }
  }, ">+0.2")
    .to(loadHero, {
      width: "100vw",
      height: "100vh",
      rotate: 0,
      z: 1,
      duration: 1.6
  }, "<").to(loadHeroBg, {
      rotate: 0,
      yPercent: 0,
      scale: 1,
      duration: 1.6,
      z: 1
  }, "<").to(loadHeroContent, {
      rotate: 0,
      duration: 1.6,
      z: 1
  }, "<").to(loadHeroOverlay, {
      opacity: 0,
      duration: 1.6
  }, "<").to("[data-load-reveal-vertical]", {
      scale: 0,
      duration: .1
  }, "<+=0.1").to(loaderBottomItems, {
      yPercent: 100,
      opacity: 0,
      stagger: {
          eacH: .05,
          from: "center"
      }
  }, "<+=0.1").from(".navbar_inner", {
      y: "-50%",
      opacity: 0,
      duration: .8,
      ease: "expo.out"
  }, "<").from(loadHeroFade, {
      opacity: 0,
      y: "50%",
      duration: 1,
      stagger: .05,
      z: 1,
      ease: "expo.out",
      onStart() {
        // lenis.start()
      }
  }, ">-=0.6");


  //init video
      // Initialize Plyr for all video tags
      document.querySelectorAll('video').forEach(video => {
        new Plyr(video, {});
      });
  })

    return (
        <>
        <div fullscreen="true" mode="light" class="z-99 pointer-events-none flex flex-row justify-between items-center w-full p-4 fixed inset-x-0 top-0" ref={navWrapper}>
            <div class="navbar_inner pointer-events-auto text-secondary-900 border-dashed border rounded-[.9vw] flex flex-row justify-between items-center w-full h-[8vh] px-6 border-color-[currentColor]">
                <a aria-label="home" href="/" aria-current="page" class="w-[4.9rem] relative max-w-full inline-block">
                    <SVGLogo />
                </a>
                <div class="gap-x-[2vw] gap-y-[2vw] flex flex-row justify-end items-center">
                    <div class="relative z-1">
                        <a href="#" class="text-black justify-start items-end w-[2.5rem] h-[2.5rem] flex relative max-w-full">
                            <div class="z-1 gap-x-[.125rem] gap-y-[.125rem] border-dashed border border-[1px] border-color-[currentColor] rounded-[.25rem] grid grid-rows-[auto_auto] grid-cols-2 auto-cols-fr w-[2.25rem] h-[2.25rem] p-[.2rem] relative">
                                <div class="opacity-80 rounded-[.125rem] w-full h-full bg-white"></div>
                                <div class="opacity-80 rounded-[.125rem] w-full h-full bg-white"></div>
                                <div class="opacity-80 rounded-[.125rem] w-full h-full grid-area-[1_/_1_/_3_/_2] bg-white"></div>
                            </div>
                            <div class="z-2 bg-white border-[1px_solid_#000] rounded-[100vw] justify-center items-center w-[1vw] min-w-[1.25rem] h-[1vw] min-h-[1.25rem] text-[.75rem] flex absolute inset-[-.3rem_-.3rem_auto_auto]">
                                <div>0</div>
                            </div>
                        </a>
                    </div>
                    <div ref={navTrigger} class="cursor-pointer border-dashed border border-color-[currentColor] rounded-[3vw] justify-center items-center w-[3.8rem] h-[2.4rem] p-[12px] flex max-w-full nav_trigger">
                        <div class="gap-x-[.3rem] gap-y-[.3rem] flex flex-col justify-between nav_trigger-inner">
                            <div class="w-[1.7rem] h-[2px] bg-secondary-900 nav_line is-top"></div>
                            <div class="w-[1.7rem] h-[2px] bg-secondary-900 nav_line is-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={menuWrapper} class="z-[-1] pointer-events-auto text-[var(--white)] w-full h-full hidden fixed inset-0" style={"display: none"}>
                <div class="z-[-1] w-full h-full flex absolute inset-0">
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                    <div class="bg-secondary-900 w-[6.25vw] h-full line"></div>
                </div>
                <div class="w-full h-full pt-[13vh] pl-[7vw] md:pt-[21vh] md:pl-[17vw] relative">
                    <div class="z-3 gap-x-[12vw] gap-y-[12vw] flex flex-col items-start md:flex-row md:items-end relative">
                        <div class="flex flex-col items-start">
                            <a href="/" class="max-w-full relative overflow-hidden">
                                <h2 class="h-nav text-size-6xl md:text-size-9xl duration-300 ease-in-out pb-2 text-white">首页</h2>
                            </a>
                            <a href="/work" class="max-w-full relative overflow-hidden">
                                <h2 class="h-nav text-size-6xl md:text-size-9xl duration-300 ease-in-out pb-2 text-white">产品</h2>
                            </a>
                            <a href="/team" class="max-w-full relative overflow-hidden">
                                <h2 class="h-nav text-size-6xl md:text-size-9xl duration-300 ease-in-out text-white">联系我们</h2>
                            </a>
                        </div>
                        <div class="gap-x-[1vw] gap-y-[1vw] flex flex-col relative text-white">
                            <div id="socials" class="tracking-wide text-xs font-semibold leading-[.7vw]">Socials</div>
                            <div class="gap-x-[1vw] gap-y-[1vw] flex flex-col">
                                <a href="#" class="gap-x-[1rem] gap-y-[1rem] opacity-50 items-center transition-opacity duration-600 ease-[cubic-bezier(.19,1,.22,1)] flex max-w-full">
                                    <div class="w-1/3">
                                        <img src={Wechat} class="w-full block relative align-middle max-w-full inline-block"/></div>
                                        <div class="tracking-wide text-xs font-semibold leading-loose">Wechat</div>
                                </a>
                                <a href="#" class="gap-x-[1rem] gap-y-[1rem] opacity-50 items-center transition-opacity duration-600 ease-[cubic-bezier(.19,1,.22,1)] flex max-w-full pb-8">
                                    <div class="w-1/3">
                                        <img src={Douyin} class="w-full block relative align-middle max-w-full inline-block"/></div>
                                        <div class="tracking-wide text-xs font-semibold leading-loose">抖音</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page" style="overflow-x: clip">
          <div id="hero" class="z-2 flex justify-center items-center min-h-100svh h-100svh lg:h-screen p-0 w-full relative overflow-hidden">
            <div data-load-hero="" class="flex justify-center items-center w-full h-full relative overflow-hidden transform-none">
                <div class="text-secondary-900 w-screen h-screen absolute">
                    <div role="list" class="w-full h-full">
                        <div role="listitem" class="w-full h-full">
                            <div aria-label="🎬The Convert" rel="noopener" class="w-full h-full pb-3vw flex relative">
                                <div data-load-hero-content="" class="z-3 text-secondary-900 flex-none items-end w-full p-[2vw_3vw_3vw] flex absolute inset-0">
                                    <div data-hero-fade="" class="flex-col flex w-1/5">
                                        <div class="hero_project-title">
                                            <h5 class="text-size-base text-secondary-900 font-semibold">您是</h5>
                                        </div>
                                        <div class="hero_project-cat">
                                            <div class="tracking-wide uppercase mb-0 text-xs font-semibold">8000 位访问者</div>
                                        </div>
                                    </div>
                                    <div class="gap-[2vw] flex-col justify-center items-center flex">
                                        <div class="flex-col items-center flex">
                                            <div data-hero-fade="" class="z-2 mb-2vw relative">
                                                <div class="tracking-[.4em] uppercase text-[1vw] font-semibold leading-[1vw]">A POLLUTION-FREE LIFESTYLE</div>
                                            </div>
                                            <div data-hero-fade="" class="gap-[.4vw] items-end flex">
                                                <div class="cell_des">
                                                    <h1 class="h-h2 text-size-5xl font-bold tracking-widest">无污染</h1>
                                                </div>
                                            </div>
                                            <h1 data-hero-fade="" class="font-bold text-size-2xl md:text-size-8xl">生 <span class='text-lg'>|</span> 活 <span class='text-lg'>|</span> 方 <span class='text-lg'>|</span> 式</h1>
                                        </div>
                                        <div class="opacity-90 text-center max-w-[90%]">
                                            <div data-hero-fade="" class="tracking-[.1em] uppercase mb-0 text-[.55vw] font-semibold leading-[.7vw]">生命的意义在于活出不一样的人生和高度，重要的是能够把有限的人生活出无限的精彩！长久以来，我们与自然以及与我们的内心失去了联系，我们需要走近自然，找到我们的内心，这样才不会焦虑和迷茫。无污染生活方式是一种健康的力量，它让我们重新找到与自然和谐相处的方式，唤醒我们内心的纯净的力量！让内心在纯粹中自然生发出滋养生命的能量！赋予我们生命以更加积极的意义！</div>
                                        </div>
                                    </div>
                                    <div data-hero-fade="" class="hero_col flex flex-col items-end w-1/5">
                                      <a href="" class='z-4 cursor-pointer items-center flex relative'>
                                            <div class="relative inline-block">
                                                <div class="tracking-wide text-size-base font-semibold">查看产品</div>
                                                <div class="dashes"></div>
                                            </div>
                                            <div class="w-[1.5vw] ml-2">
                                              <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M792.797779 792.08607c71.14434-71.800279 115.542526-170.937161 115.542526-280.334733 0-109.398596-44.398186-208.534454-115.542526-280.334733-71.713298-71.222111-170.742732-115.669416-280.025695-115.669416l0 0c-109.282962 0-208.303186 44.447305-280.026718 115.669416l0 0c-71.704089 71.800279-116.111484 170.936137-116.111484 280.334733l0 0 0 0 0 0c0 109.397572 44.407396 208.534454 116.111484 280.334733 71.724555 71.78186 170.743756 116.227118 280.026718 116.227118l0 0 0 0C622.055047 908.313188 721.084481 863.868953 792.797779 792.08607L792.797779 792.08607zM829.228503 194.956204c80.8197 81.484849 130.909515 193.140858 130.909515 316.796156 0 123.634832-50.088792 235.888452-130.909515 316.795133-81.387635 80.906681-192.947454 131.043568-316.456419 131.043568-123.500778 0-235.637742-50.135864-316.447209-131.043568C115.495966 747.640812 65.416384 635.386168 65.416384 511.751337c0-123.655298 50.079582-235.310284 130.908492-316.796156C277.13332 114.049522 389.271306 63.893192 512.772085 63.893192l0 0C636.281049 63.893192 747.840868 114.049522 829.228503 194.956204L829.228503 194.956204zM434.239474 272.448112c4.551666-4.572132 10.803044-7.408737 18.210757-7.408737l0 0c3.412726 0 6.828522 0.559748 9.66308 1.717108 3.415796 1.697665 6.27082 3.39533 8.547677 5.691629l0 0 200.913892 221.054605c2.276856 2.856048 3.984754 5.130857 5.691629 8.565073 1.137916 2.855024 1.706875 6.250354 1.706875 9.68457 0 3.413749-0.568958 6.829546-1.706875 10.263761-1.706875 2.834558-3.414773 5.689582-5.691629 7.966439L470.659965 751.055584l0 0c-2.276856 2.854001-5.131881 4.552689-8.547677 5.690606-2.835581 1.137916-6.250354 2.276856-9.66308 2.276856-7.407714 0-13.659091-3.413749-18.210757-7.966439l0 0c-4.552689-4.553713-7.407714-10.82351-7.407714-18.2302 0-3.414773 0.559748-6.847965 1.697665-9.683547 1.157359-2.856048 3.433192-5.711072 5.710049-7.987928l184.401824-203.402573L434.239474 308.907489c-2.276856-2.275833-4.552689-5.131881-5.710049-7.966439-1.137916-3.433192-1.697665-6.848988-1.697665-10.262738C426.830737 283.84979 429.685761 277.000801 434.239474 272.448112L434.239474 272.448112z" fill="currentColor" ></path></svg>
                                            </div>
                                      </a>
                                    </div>
                                </div>
                                <div data-load-hero-bg="" class="flex justify-center items-end absolute inset-0">
                                    <div style={`background-image: url(${backgroundImage})`} class="bg-center bg-repeat w-full h-full absolute"></div>
                                    <img loading="eager" src="" class="hero-img is-height" />
                                    <div class="hero_grad is-black"></div>
                                    <div class="hero_grad is-white"></div>
                                    <div class="hero_texture-wrap">
                                        <div class="hero_texture"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-load-hero-overlay="" class="z-3 opacity-0 pointer-events-none bg-black w-full h-full absolute inset-0"></div>
            </div>
          </div>
          <div class="z-2 justify-center items-center w-full p-[.5vw_2vw_1vw] relative overflow-hidden">
            <div class="three-col_wrap w-dyn-list">
              <div role="list" class="three-col_list w-dyn-items">
              {urlsTop.map((item, index) => (
                <div role="listitem" class="three-col_item w-dyn-item"  classList={{ "is--active": activeIndex() === index }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}>
                    <a  class="border-1 border-dashed border-black rounded-2.5 flex flex-col justify-end items-stretch w-full h-40vw ml-0.5vw mr-0.5vw relative overflow-hidden">
                      <img class='w-full h-full inset-0' />
                      <div class="vid-wrap is--wide three-col">
                          <video crossorigin playsinline data-poster={item.poster}>
                            <source src={item.url} type="video/mp4" />
                          </video>
                      </div>
                      <div class="three-col__content">
                        <div class="flex-v gap-xs">
                          <h5 class="h-h4 is-white">{item.title}</h5>
                          <div class="div-block-80">
                            <h6 class="eyebrow_14 is-white">{item.subtitle}</h6>
                          </div>
                        </div>
                        <div class="flex-h gap-s">
                          <img src="/src/assets/arrow.svg" loading="lazy" alt="arrow up right" class="three-col__link-img"/>
                        </div>
                      </div>
                    </a>
                </div>))}
              </div>
            </div>
          </div>
          <div class="section grid-wrap is-white is-2">
            <div class="cell_container">
              <div class="cell_inner is-left">
              <div class="cell_list-wrap w-dyn-list">
                <div role="list" class="cell_list-list w-dyn-items">
                <div role="listitem" class="cell_list-item show--o w-dyn-item">
                  <div class="cell_bleed-2">
                  <div class="cell_split-2">
                    <div class="cell_block">
                    <div class="cell_img is-height">
                      <img alt="" src="/src/assets/imgs/jennifer-schmidt-unsplash-small.jpg" class="img is-height" />
                    </div>
                    </div>
                    <div class="cell_block up-right">
                    <div class="cell_eyebrow">
                      <div class="eyebrow_14-4">
                      <strong>FEATURED</strong>
                      </div>
                    </div>
                    <div class="cell_h4">
                      <h4 class="h-h4 is-big">无污染<br/><span class='text-xs'>生 | 活 | 方 | 式</span></h4>
                    </div>
                    <div class="cell_text-2">
                      <div class="body_17">
                        无污染生活方式创立发起人
                      <br />
                      <br />
                      <br />蔡明希
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="qv_wrap">
                    <div class="qv_item">
                      <div class="cell_content">
                        <div class="cell_img-wrap">
                          <img class='w-full' src="/src/assets/imgs/lily-banse-YHS-unsplash-small.jpg" />
                        </div>
                        <div class="cell_gradient"></div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
                </div>
              </div>
              </div>
              <div class="cell_inner is-right">
              <div class="cell_desc-wrap">
                <div class="cell_desc-eyebrow">
                <div class="eyebrow_22-5">
                  我们的愿景
                </div>
                </div>
                <div class="cell_desc-row">
                <div class="cell_slant">
                  <div class="slant-7">
                  拥抱
                  </div>
                </div>
                <div class="cell_des">
                  <h2 class="h-h2">无污染生活方式<br /></h2>
                </div>
                <div class="cell_slant is-right">
                  <div class="slant-7">
                  让
                  </div>
                </div>
                </div>
                <div class="cell_desc-row">
                <div class="cell_desc-row">
                  <h2 class="h-h2">自然的力量成为你日常的一部分</h2>
                </div>
                </div>
              </div>
              <div class="cell_desc-text-2">
                <h6 class="h-h6">选择绿色出行、使用环保产品，减少对环境的负担，为自己和地球创造一个更加清新的未来。享受来自大自然的纯净空气、清澈水源和天然食材，每一次呼吸都充满健康的力量。用行动保护环境、呵护自己，从今天开始，让无污染的生活方式成为你的新常态，为未来带来更多希望和美好。.</h6>
              </div>
              <div class="m-top m--small">
                <a href="/contact" class="cta_link w-inline-block">
                <div class="cta_text">
                  <div class="eyebrow_14">
                  加入我们
                  </div>
                  <div class="dashes"></div>
                </div>
                <div class="cta_link-img">
                  <img src="https://cdn.prod.website-files.com/64e6091972f5864e5b3e6f9e/64edd978897bcddbe2c60806_arrow_black.svg" loading="lazy" alt="arrow right" class="img w-[30px]" />
                </div></a>
                <link rel="prefetch" href="/contact" />
              </div>
              </div>
            </div>
            <div class="marquee">
              <div class="marquee-bg">
              <div class="marquee-bg__panel is--1"></div>
              <div class="marquee-bg__panel is--2"></div>
              <div class="marquee-bg__panel is--3"></div>
              <div class="marquee-bg__panel is--4"></div>
              <div class="marquee-bg__panel is--5"></div>
              <div class="marquee-bg__panel is--6"></div>
              </div>
              <div class="marquee-inner">
              <div class="marquee-panel">
                <div data-split-text="" class="marquee_text">
                无污染
                </div>
                <div data-split-text="" class="marquee_text">
                -
                </div>
                <div data-split-text="" class="marquee_text">
                生活方式
                </div>
                <div data-split-text="">
                -
                </div>
              </div>
              <div class="marquee-panel">
                <div data-split-text="">
                无污染
                </div>
                <div data-split-text="">
                -
                </div>
                <div data-split-text="">
                生活方式
                </div>
                <div data-split-text="">
                -
                </div>
              </div>
              </div>
            </div>                
          </div>
          <div class="section is-category is-white">
            <div class="gap-1vw flex">
              <div class="bd_category w-inline-block">
                <div class="gap-.3vw flex">
                  <h5 class="h-h5">Introductions</h5>
                  <div class="bd_category-count">
                    <div class="body_17">(01)</div>
                  </div>
                </div>
                <div class="absolute top-auto right-1.5vw bottom-1vw left-auto">
                  <div class="text-size-3xl font-800">01 无污染生活方式</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="loader z-101 justify-center items-center w-full h-[100svh] min-h-[100svh] flex fixed inset-0 overflow-hidden">
            <div class="z-2 flex flex-row justify-center items-stretch h-[11vw] relative">
                <div data-load-logo="center" class="flex justify-center items-center w-[11vw] h-full relative">
                    <div data-load-border="" class="w-full pt-[100%] absolute shadow-[inset_0_0_0_0.6vw_#052e16]"></div>
                    <div data-load-border="" class="pt-[100%] absolute w-[80%] pt-[80%] shadow-[inset_0_0_0_0.6vw_#052e16]"></div>
                    <div data-load-border="" class="pt-[100%] absolute w-[60%] pt-[60%] shadow-[inset_0_0_0_0.6vw_#052e16]"></div>
                    <div data-load-border="" class="pt-[100%] absolute w-[40%] pt-[40%] shadow-[inset_0_0_0_0.6vw_#052e16]"></div>
                    <div data-load-center-x="" class="flex-none justify-center items-center flex relative">
                        <div data-load-reveal="" class="origin-[50%_0] bg-[#052e16] w-[2.2vw] h-[1.2vw]"></div>
                        <div data-load-reveal-vertical="" class="origin-[50%_0] bg-[#052e16] w-[1.2vw] h-[2.2vw] absolute"></div>
                    </div>
                    <div data-animation-speed="2" data-animation-path="https://lottie.host/1c22590d-74f8-421a-9452-b327c1156f66/G3hU859uSD.json" data-loader-lottie="" class="absolute inset-0 load-o-lottie"></div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex h-16">
              <div data-load-bottom="" className="flex-1 flex items-center justify-center text-xs">
                <span>版权所有</span>
              </div>
              <div data-load-bottom="" className="w-1/2 flex items-center justify-center">
                <div className="w-24">
                  <SVGLogo />
                </div>
              </div>
              <div data-load-bottom="" className="flex-1 flex items-center justify-center text-xs">
                <span>加载中...</span>
              </div>
            </div>
        </div>
        </>
    )
}