// --------- Api function --------------------------------
async function bookApi () {
    const res = await fetch('https://gutendex.com/books/')
    return res.json()
}

// ----------- main function --------------------------------
(async function () {
    const containerDiv = document.createElement('div')
    containerDiv.setAttribute('class', 'container-fluid p-5')
    containerDiv.style.backgroundColor = "#d5ded9"
    const rowRes = await createCard()
    containerDiv.appendChild(rowRes)
    document.body.append(containerDiv)
})()

// ----- get data from api and building cards with api datas --------------------
async function createCard() {
    const res = await  bookApi()
    const rowDiv = document.createElement('div')
    rowDiv.setAttribute('class', 'row')
    if (res && res.results) {
        res.results.forEach((items, index) => {
            const colDiv = document.createElement('div')
            colDiv.setAttribute('class', 'col-sm-12 col-md-4 col-lg-3')
            const card = `
                <div class="card p-2 mt-4 border" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;" >
                    <img class="card-img-top"height="350px" src="${items.formats['image/jpeg']}" alt="Card image cap">
                    <div class="card-body">
                        <h4 title="${items.title}" class="card-title text-truncate">${items.title}</h4>
                        <h6 class="card-title text-truncate" >Author: ${items?.authors[0]?.name}</h6>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <small class="text-muted">Languages: ${items?.languages[0]}</small>
                        <small class="text-muted ">Media Type: ${items?.media_type}</small>
                    </div>
                </div>
            `
            colDiv.innerHTML = card
            rowDiv.append(colDiv)
        })
    }
    return rowDiv;
}