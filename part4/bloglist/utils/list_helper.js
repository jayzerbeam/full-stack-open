const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let res = 0;
  blogs.forEach((blog) => {
    if (blog.likes) {
      res += blog.likes;
    }
  });
  return res;
};

const favoriteBlog = (blogs) => {
  let leastLikes = Number.NEGATIVE_INFINITY;
  let favoriteBlogIndex = -1;

  for (let i = 0; i < blogs.length; i++) {
    const currentLikes = blogs[i].likes;
    if (currentLikes > leastLikes) {
      leastLikes = currentLikes;
      favoriteBlogIndex = i;
    }
  }

  if (favoriteBlogIndex === -1) return {};

  return {
    title: blogs[favoriteBlogIndex].title,
    author: blogs[favoriteBlogIndex].author,
    likes: blogs[favoriteBlogIndex].likes,
  };
};

const mostBlogs = (blogs) => {
  const seenList = {};

  blogs.forEach((blog) => {
    if (blog.author) {
      if (!seenList[blog.author]) {
        seenList[blog.author] = 1;
      } else {
        seenList[blog.author] += 1;
      }
    }
  });

  let result = {
    author: "",
    blogs: 0,
  };

  for (const author in seenList) {
    if (seenList.hasOwnProperty(author) && seenList[author] > result.blogs) {
      result.author = author;
      result.blogs = seenList[author];
    }
  }

  return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
