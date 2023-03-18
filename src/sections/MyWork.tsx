import Projects from "../projects.json";
import { For, createEffect, createSignal, onMount } from "solid-js";

export default function MyWork() {
  const [details, setDetails] = createSignal(false);

  const [currentIndex, setCurrentIndex] = createSignal(
    Math.floor(Object.keys(Projects).length / 2)
  );

  onMount(() => {
    const carousel = document.getElementById("carousel") as HTMLDivElement;

    carousel.scrollTo(carousel.scrollWidth / 2 - 450 * 2, 0);

    carousel.addEventListener("scroll", () => {
      const index = Math.floor(carousel.scrollLeft / (450 + 64)) - 1;

      if (currentIndex() !== index) {
        setCurrentIndex(index);
      }
    });
  });

  const currentProject = () => Projects[currentIndex()];

  return (
    <div class="relative w-full h-screen flex flex-col items-center justify-center">
      <div
        style={{
          opacity: details() ? "0" : "1",
          "pointer-events": details() ? "none" : "auto",
        }}
        class="flex flex-col w-full h-full items-center  gap-16 justify-center transition-opacity duration-300"
      >
        <div class="flex flex-col items-center gap-4">
          <h2 class="text-5xl font-semibold select-none">My Work</h2>
          <p class="text-grey text-xl select-none">Check out some of my work</p>
        </div>
        <div
          id="carousel"
          class="w-full h-[30vh] scroll-smooth items-center gap-16 select-none scrollbar-hidden overflow-y-visible  flex overflow-x-scroll snap-x snap-mandatory"
        >
          <For each={Projects}>
            {(project) => (
              <img
                onClick={() => setDetails(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.src = project.gif;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.src = project.image;
                }}
                id={project.name}
                draggable={false}
                src={project.image}
                alt={project.name}
                class="cursor-pointer hover:scale-110 max-sm:min-w-[calc(100vw_-_80px)] min-w-[450px] aspect-video rounded-2xl transition-transform duration-300 object-cover snap-center first:ml-[100vw] last:mr-[100vw]"
              />
            )}
          </For>
        </div>
        <div class="flex gap-8 items-center">
          <img
            onClick={() => {
              const carousel = document.getElementById(
                "carousel"
              ) as HTMLDivElement;

              const card = document.getElementById(
                currentProject().name
              ) as HTMLDivElement;

              carousel.scrollBy(-card.clientWidth, 0);
            }}
            src="/icons/arrow-left-circle.svg"
            class="w-8 h-8 cursor-pointer select-none"
            alt="Arrow left"
            draggable={false}
          />
          <p class="font-semibold text-xl select-none ">
            {currentProject().name}
          </p>
          <img
            onClick={() => {
              const carousel = document.getElementById(
                "carousel"
              ) as HTMLDivElement;

              const card = document.getElementById(
                currentProject().name
              ) as HTMLDivElement;

              carousel.scrollBy(card.clientWidth, 0);
            }}
            src="/icons/arrow-left-circle.svg"
            class="rotate-180 w-8 h-8 cursor-pointer select-none"
            alt="Arrow right"
            draggable={false}
          />
        </div>
      </div>

      <div
        style={{
          opacity: details() ? "1" : 0,
          "pointer-events": details() ? "auto" : "none",
        }}
        class="absolute h-full mr-8 transition-opacity duration-300 flex items-center"
      >
        <div class="flex flex-col w-1/2 p-12 gap-8">
          <div
            onClick={() => setDetails(false)}
            class="flex  items-center gap-4 cursor-pointer text-2xl font-semibold"
          >
            <img src="/icons/arrow-left.svg" class="w-6" />
            My Work
          </div>
          <h2 class="text-5xl font-semibold">{currentProject().name}</h2>
          <p class="text-grey ">{currentProject().description}</p>
        </div>
        <div class="h-full flex items-center">
          <img
            draggable={false}
            src={currentProject().gif || currentProject().image}
            alt={currentProject().name}
            class="h-3/4 aspect-video object-cover rounded-2xl select-none translate-x-[32px]"
          />
        </div>
      </div>
    </div>
  );
}
