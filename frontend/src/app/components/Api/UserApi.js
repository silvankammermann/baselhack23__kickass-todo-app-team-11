const fetchUserData = async () => {
  try {
    const response = await fetch(`http://localhost:5000/get-user`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export default fetchUserData;