const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>(res.json()))
    .then(data=>displayData(data.data));
}
const loadWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>(res.json()))
    .then(data=>displayWord(data.data));
}
const displayWord=(words)=>{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";
    words.forEach(word => {
        const wordDiv=document.createElement("div");
        wordDiv.innerHTML=`
             <div class="space-y-4 bg-white py-10 px-5 rounded-lg shadow-md text-center">
        <h2 class="text-[1.8rem] font-bold">${word.word}</h2>
        <h4 class="text-[1.2rem] font-medium">Meaning/pronunciation</h4>
        <p class="font-bangla font-semibold text-[1.8rem]">"${word.meaning} / ${word.pronunciation}"</p>
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
   <button onclick="loadWord(${lesson.level_no})" class="btn btn-soft btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>`
    levelContainer.appendChild(btnDiv);
   }
}
loadData();
