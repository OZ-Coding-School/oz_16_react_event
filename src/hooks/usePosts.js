import useLocalStorage from "@/hooks/useLocalStorage";

export default function usePosts() {
  const [posts, setPosts] = useLocalStorage("posts", []);

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return { posts, setPosts, addPost };
}
