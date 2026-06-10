import { useEffect, useState } from "react";

export default function InfiniteFeed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = () => {
    // Prevent duplicate API calls
    if (loading) return;

    setLoading(true);

    // Simulated API Call
    setTimeout(() => {
      const newPosts = Array.from(
        { length: 10 },
        (_, index) => ({
          id: (page - 1) * 10 + index + 1,
          title: `Post ${
            (page - 1) * 10 + index + 1
          }`,
          description:
            "This is a sample post loaded dynamically.",
        })
      );

      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + window.scrollY;

      const threshold =
        document.documentElement.scrollHeight - 200;

      if (scrollPosition >= threshold && !loading) {
        fetchPosts();
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [loading]);

  return (
    <div className="container">
      <h1>Infinite Scroll Feed</h1>

      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}

      {loading && (
        <div className="loading">
          Loading more posts...
        </div>
      )}
    </div>
  );
}