//-------------> Data-------------------//
const users = [
  {
    profilePic:
      "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=-tzu2ednmWQlqCf-cBoaYuZPwAhzcEAPvfN1_ix9Vm8=",
    displayImage:
      "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pendingMsg: 3,
    location: "USA, Californiaaa",
    Name: "Araina",
    age: 23,
    interests: [
      {
        icon: `<i class="ri-music-2-line"></i>`,
        interest: "Music",
      },
      { icon: `<i class="ri-football-line"></i>`, interest: "Football" },
    ],
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing Maiores, eveniet.",
    isFriend: null,
  },
  {
    profilePic:
      "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=-tzu2ednmWQlqCf-cBoaYuZPwAhzcEAPvfN1_ix9Vm8=",
    displayImage:
      "https://i.pinimg.com/736x/63/f2/49/63f24925bee82df07c02f91ba7b2ae6c.jpg",
    pendingMsg: 12,
    location: "Delhi, India",
    Name: "Alia",
    age: 25,
    interests: [
      {
        icon: `<i class="ri-music-2-line"></i>`,
        interest: "Music",
      },
      { icon: `<i class="ri-football-line"></i>`, interest: "Football" },
    ],
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing Maiores, eveniet.",
    isFriend: null,
  },
  {
    profilePic:
      "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=-tzu2ednmWQlqCf-cBoaYuZPwAhzcEAPvfN1_ix9Vm8=",
    displayImage:
      "https://i.pinimg.com/736x/3b/0b/84/3b0b84614b7bebb48160e3b8a83df516.jpg",
    pendingMsg: 6,
    location: "Munic, Germany",
    Name: "Eva",
    age: 19,
    interests: [
      {
        icon: `<i class="ri-music-2-line"></i>`,
        interest: "Music",
      },
      { icon: `<i class="ri-football-line"></i>`, interest: "Football" },
    ],
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing Maiores, eveniet.",
    isFriend: null,
  },
  {
    profilePic:
      "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=-tzu2ednmWQlqCf-cBoaYuZPwAhzcEAPvfN1_ix9Vm8=",
    displayImage:
      "https://i.pinimg.com/736x/af/ae/26/afae26a35f31154701936177df5aaa25.jpg",
    pendingMsg: 9,
    location: "Lahore, Pakista",
    Name: "Mariyam",
    age: 24,
    interests: [
      {
        icon: `<i class="ri-music-2-line"></i>`,
        interest: "Music",
      },
      { icon: `<i class="ri-football-line"></i>`, interest: "Football" },
    ],
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing Maiores, eveniet.",
    isFriend: null,
  },
];

function select(elem) {
  return document.querySelector(elem);
}

let curr = 0;
let isAnimating = false;

function setData(index) {
  select(".prflImg img").src = users[index].profilePic;
  select(".badge h5").textContent = users[index].pendingMsg;
  select(".location h3").textContent = users[index].location;
  select(".name").textContent = users[index].Name;
  select(".age ").textContent = users[index].age;
  let cluter = "";
  users[index].interests.forEach(function (interest) {
    cluter += `<div
                  class="tag flex gap-2 text-white items-center bg-white/30 px-3 py-1 rounded-full mt-3"
                >
                ${interest.icon}
                  <h3 class="text-sm text-white">${interest.interest}</h3>
                </div>`;
  });
  select(".tags").innerHTML = cluter;
  select(".bio p").textContent = users[index].bio;
}

(function setInitial() {
  select(".mainCard img").src = users[curr].displayImage;
  select(".incomingCard img").src = users[curr + 1]?.displayImage;
  setData(curr);
  curr = 2;
})();

function imageChng() {
  if (!isAnimating) {
    isAnimating = true;
    const tl = gsap.timeline({
      onComplete: function () {
        isAnimating = false;
        const main = select(".mainCard");
        const incoming = select(".incomingCard");

        incoming.classList.remove("z-[2]");
        incoming.classList.add("z-[3]");
        incoming.classList.remove("incomingCard");

        main.classList.remove("z-[3]");
        main.classList.add("z-[2]");
        main.classList.remove("z-[3]");
        gsap.set(main, {
          opacity: 1,
          scale: 1,
        });

        if (curr === users.length) curr = 0;
        select(".mainCard img").src = users[curr].displayImage;
        curr++;

        main.classList.remove("mainCard");

        main.classList.add("incomingCard");
        incoming.classList.add("mainCard");
      },
    });
    tl.to(
      ".mainCard",
      {
        opacity: 0,
        scale: 1.1,
        ease: Circ,
        duration: 0.7,
      },
      "a"
    ).from(
      ".incomingCard",
      {
        opacity: 0,
        scale: 1.1,
        ease: Circ,
        duration: 0.7,
      },
      "a"
    );
  }
}

const deny = select(".deny");
const accept = select(".accept");

deny.addEventListener("click", () => {
  setData(curr - 1);
  imageChng();
  gsap.from(".details .forAnimate", {
    y: "100%",
    opacity: 0,
    ease: Power4.easeInOut,
    stagger: 0.06,
    duration: 1,
  });
});

accept.addEventListener("click", () => {
  setData(curr - 1);
  imageChng();
  gsap.from(".details .forAnimate", {
    y: "100%",
    opacity: 0,
    ease: Power4.easeInOut,
    stagger: 0.06,
    duration: 1,
  });
});

(function containerCreator() {
  document.querySelectorAll(".forAnimate").forEach(function (elementt) {
    const div = document.createElement("div");
    div.classList.add(`${elementt.classList[1]}Container`, "overflow-hidden");
    div.appendChild(elementt);
    select(".details").appendChild(div);
  });
})();
