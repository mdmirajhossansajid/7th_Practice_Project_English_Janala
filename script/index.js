const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>(res.json()))
    .then(data=>displayData(data.data));
}
const removeActive=()=>{
    const lessonbuttons=document.querySelectorAll(".lesson-btn");
   lessonbuttons.forEach(btn=>{
    btn.classList.remove("active");
   });
}
const loadWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>(res.json()))
    .then(data=>
    {   removeActive();
         const clickbtn=document.getElementById(`lesson-btn-${id}`);
    clickbtn.classList.add("active");
        displayWord(data.data)
    }
    );
}
const displayWord=(words)=>{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";
    if(words.length===0){
         wordContainer.innerHTML=`
         <div class="text-center col-span-full my-3 py-6 font-bangla">
          <img class="mx-auto mb-5" src="./assets/alert-error.png" alt="">
        <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-semibold mt-4">নেক্সট Lesson এ যান।</h2>
     </div>`;
    }
    words.forEach(word => {
        const wordDiv=document.createElement("div");
        wordDiv.innerHTML=`
             <div class="space-y-4 bg-white py-10 px-5 rounded-lg shadow-md text-center">
        <h2 class="text-[1.8rem] font-bold">${word.word? word.word:"শব্দ খুজে পাওয়া যায় নি"}</h2>
        <h4 class="text-[1.2rem] font-medium ">Meaning/pronunciation</h4>
        <p class="font-bangla font-semibold text-[1.3rem]">"${word.meaning? word.meaning:"অর্থ খুজে পাওয়া যায় নি"} / ${word.pronunciation? word.pronunciation:"উচ্চারণ খুজে পাওয়া যায় নি"  }"</p>
        <div class="flex justify-between ">
            <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>
        `
        wordContainer.appendChild(wordDiv);
    });
}

const displayData=(lessons)=>{
   const levelContainer=document.getElementById("level-container");
   levelContainer.innerHTML="";
   for(let lesson of lessons){
    const btnDiv=document.createElement("div");
    btnDiv.innerHTML=`
   <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-soft btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>`
    levelContainer.appendChild(btnDiv);
   }
}
loadData();
