const handleCategory = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <a onclick="handleLoad('${category.category_id}')" class="tab">${category.category}</a>
        `;
    tabContainer.appendChild(div);
  });
};
const handleLoad = async (categoryId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const videos = await response.json();
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const errorMessage = document.getElementById('error-Message');
  if (videos.data.length === 0) {
    errorMessage.classList.remove('hidden');
  }
  else {
    errorMessage.classList.add('hidden');
  }
  videos.data?.forEach((videos) => {
    const seconds = videos.others.posted_date;
    const hours = Math.floor(seconds /3600);
    const minutes = Math.floor((seconds % 3600) /60);
    const formattedTime = `${hours.toString().padStart(2, "0")} hours ${minutes
      .toString()
      .padStart(2, "0")} min ago`
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-[290px] h-[240px] ml-5 bg-gray-100">
      <figure>
        <img class=" mx-auto"
          src= ${videos?.thumbnail}
          alt="">
      </figure>
      <p class=" text-white mr-2 w-fit mx-auto -mt-5">
             ${videos.others.posted_date ? formattedTime : ""}</p>
      <div class="flex gap-2 pt-3">
        <div>
          <img class="rounded-full mt-6 w-[40px]
          h-[40px]" src="${videos.authors[0].profile_picture}" >
        </div>
        <div>
          <h3 class="font-bold mt-5">${videos.title}</h3>
          <div class="flex gap-2">
            <p class="text-sm">${videos.authors[0].profile_name}</p>
            <span>${videos.authors[0].verified ? ('<img src="fi_10629607.png" alt="">')
        : ''}</span>
          </div>
          <p class="text-sm">${videos?.others.views}</p>
          
        </div>
      </div>
    </div> `
    cardContainer.appendChild(div);
  });
};
handleCategory();
handleLoad("1000")

const blogBtn = document.getElementById("blog-btn");
blogBtn.addEventListener("click", function () {
  window.location.href = 'blog.html';
});