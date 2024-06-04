splitCharacters();
animateOnScroll();

function splitCharacters() {
  const targets = document.querySelectorAll("[data-split]");

  for (const target of targets) {
    let string = '<span class="inner"><span class="front">';
    let counter = 0;

    const targetContent = target.textContent;
    const words = targetContent.trim().split(" ");

    words.forEach(function (word, wordIndex, wordArray) {
      const chars = word.split("");
      chars.forEach(function (char, charIndex, charArray) {
        string += `<span class="char" style="--index: ${++counter};">${char}</span>`;

        // if we're on the last character of the last word, reset the counter
        if (
          wordIndex === wordArray.length - 1 &&
          charIndex === charArray.length - 1
        ) {
          counter = 0;
        }
      });

      // add a space between each word unless it's the last one
      if (wordIndex !== wordArray.length - 1) {
        string += "<span>&nbsp;</span>";
      }
    });
    string += "</span>"; //end front

    string += '<span class="back">';
    words.forEach(function (word, wordIndex, wordArray) {
      const chars = word.split("");
      chars.forEach(function (char) {
        string += `<span class="char" style="--index: ${++counter};">${char}</span>`;
      });
      if (wordIndex !== wordArray.length - 1) {
        string += "<span>&nbsp;</span>";
      }
    });

    string += "</span>"; // end back
    string += "</span>"; // end inner
    target.innerHTML = string;
  }
}

function animateOnScroll() {
  const targets = document.querySelectorAll('[data-split-type="scroll"]');
  const isAnimatedClass = "is-animated";
  const threshold = 0.5;

  function callback(entries, observer) {
    entries.forEach((entry) => {
      const elem = entry.target;
      if (entry.intersectionRatio >= threshold) {
        elem.classList.add(isAnimatedClass);
      } else {
        elem.classList.remove(isAnimatedClass);
      }
    });
  }

  const observer = new IntersectionObserver(callback, { threshold });
  for (const target of targets) {
    observer.observe(target);
  }
}
