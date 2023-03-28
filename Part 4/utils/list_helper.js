const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
  if (array.length === 0) return {}
  let index = 0
  for (let i = 0; i < array.length; i++){
    if (array[i].likes > array[index].likes){
      index = i
    }
  }
  
  const res = {
    'title': array[index].title,
    'author': array[index].author,
    'likes': array[index].likes
  }
  return res
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}