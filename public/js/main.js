const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const favoritesButton = document.getElementById('favoritesSearch')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRestaurant)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

favoritesSearch.addEventListener('click', findFavorites)

async function deleteRestaurant(){
    const rName = this.parentNode.childNodes[1].innerText
    const cType = this.parentNode.childNodes[3].innerText
    const rScore = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteRestaurant', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'restaurantNameS': rName,
              'cuisineTypeS': cType,
              'ratingS': rScore
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const rName = this.parentNode.childNodes[1].innerText
    const cType = this.parentNode.childNodes[3].innerText
    const rScore = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'restaurantNameS': rName,
              'cuisineTypeS': cType,
              'ratingS': rScore,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function findFavorites(){
    let searchValue = favoriteFoods.value
    let collection = db.collection('food-options').find(searchValue)
    await collection.forEach(console.log)
}