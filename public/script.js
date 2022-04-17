let searchInput = document.getElementById("search");
let titlesList= document.getElementById("titles-list")

let value;
let titles = [];

const loadTitles = async () =>{
    try {
        const res = await fetch('http://localhost:8000/');
        titles = await res.json()
        displayTitles(titles.titleArr)
    }catch (err) {
        console.error(err)
    }
}
loadTitles();


const displayTitles = (titles) =>{
    console.log("titles",titles)
    const htmlString = titles.map((title,index)=>(
        `<li class="title" key=${index}>
            <h3>${title}</h3>
        </li>`
        
    ))
    .join('')
    titlesList.innerHTML = htmlString;
}


searchInput.addEventListener('keyup',(e) => {
    value = e.target.value.toLowerCase();
    // console.log(value);
    const filteredTitles = titles.titleArr.filter( title => {
        return title.includes(value)
    })
    displayTitles(filteredTitles);
})