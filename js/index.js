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
    const data = await response.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    data.data.forEach((videos) => 
    {const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-[290px] h-[220px] bg-gray-100">
      <figure>
        <img
          src= ${videos?.thumbnail}
          alt="">
      </figure>
      <div class="flex gap-2 pt-3">
        <div>
          <img class="rounded-full w-[40px]
          h-[40px]" src="${videos.authors[0].profile_picture}" >
        </div>
        <div>
          <h3 class="font-bold">${videos.title}</h3>
          <div class="flex gap-2">
            <p class="text-sm py-1">${videos.authors[0].profile_name}</p>
            <span>${videos.authors[0].verified?('<img src="fi_10629607.png" alt="">') 
            : ''}</span>
          </div>
          <p class="text-sm">${videos?.others.views}</p>
          
        </div>

      </div>
    </div> 
    `
    cardContainer.appendChild(div);
 });
};
handleCategory();
handleLoad("1000")

const blogBtn = document.getElementById("blog-btn");
blogBtn.addEventListener("click", function () {
    window.location.href = 'blog.html';
});