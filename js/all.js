let list = document.querySelector('.districtList');
let pageId = document.getElementById('pageId');
let title = document.querySelector('.districTitle')
pageId.addEventListener('click',switchPage);
const xhr = new XMLHttpRequest();
xhr.open('get','https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5',true);
xhr.send(null);
let data = [];

xhr.onload = function(){
    data = JSON.parse(xhr.responseText);
    updateList(data);
    pagination(data,1);
}

function updateList(data) {
    let str = '';
    data.forEach((item)=>{
        str += `
            <div class="col-md-5 col-10 mb-5 ">
                <div class="card text-center card--shadow h-100">
                    <div class="card-header bg-secondary text-white">
                        <strong>${item.title}</strong>
                    </div>
                    <div class="card-body text-left">
                        <strong>日期 :</strong> <span>${item.startDate} ~ ${item.endDate}</span> <br>
                        <strong>時間 :</strong> <span>${item.showInfo[0].time}</span>    <br/>
                        <strong>地點 :</strong> <span>${item.showInfo[0].locationName}</span>
                    </div>
                    <div class="card-footer text-muted">
                        <strong><a href="${item.webSales}">售票網址</a></strong> 
                    </div>
                </div>
            </div>
        `
    })
    list.innerHTML = str;
}
function pagination(data,nowPage){
    const dataTotal = data.length;
    const perPage = 10 ;
    const pageTotal = Math.ceil(dataTotal / perPage);
    const currentPage = nowPage;
    const minData = (currentPage * perPage) - perPage + 1;
    const maxData = (currentPage * perPage);
    const newData = [];
    data.forEach((item,index)=>{
        const num = index+1;
        if(num >= minData && num <= maxData){
        newData.push(item);
        }
    })
    const page ={
        pageTotal,
        currentPage,
        hasPrevious : currentPage > 1,
        haxNext: currentPage < pageTotal
    }
    updateList(newData);
    pageBtn(page);
}
function pageBtn(page) {
    let str = '';
    const total = page.pageTotal;
    if (page.hasPrevious) {
        str += `<li class="page-item "><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">上一頁</a></li>`;
    } else {
        str += `<li class="page-item disabled"><span class="page-link">上一頁</span></li>`;
    }
    for (let i = 1; i <= total; i++) {
        if (Number(page.currentPage) === i) {
            str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
    };
    if (page.hasNext) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">下一頁</a></li>`;
    } else {
        str += `<li class="page-item disabled"><span class="page-link">下一頁</span></li>`;
    }
    pageId.innerHTML = str;
}
function  switchPage(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') return;
    const page = e.target.dataset.page;
    if (title.textContent === "2020全部活動") {
        pagination(data, page);
    }
}