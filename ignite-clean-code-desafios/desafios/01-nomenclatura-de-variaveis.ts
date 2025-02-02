// Nomenclatura de variáveis

const popularityCategories = [
  {
    title: "User",
    followers: 5,
  },
  {
    title: "Friendly",
    followers: 50,
  },
  {
    title: "Famous",
    followers: 500,
  },
  {
    title: "Super Star",
    followers: 1000,
  },
];

export default async function getUserCategory(req, res) {
  const githubUsername = String(req.query.username);

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`,
    });
  }

  const githubUserResponse = await fetch(
    `https://api.github.com/users/${githubUsername}`,
  );

  if (githubUserResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`,
    });
  }

  const user = await githubUserResponse.json();

  const sortedPopularityCategories = popularityCategories.sort(
    (a, b) => b.followers - a.followers,
  );

  const associatedCategory = sortedPopularityCategories.find(
    (i) => user.followers > i.followers,
  );

  const userCategory = {
    github: githubUsername,
    category: associatedCategory.title,
  };

  return userCategory;
}

getUserCategory(
  {
    query: {
      username: "DhyonKeyllon",
    },
  },
  {},
);
