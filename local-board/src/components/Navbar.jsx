import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

export default function Navbar() {
  const navigate = useNavigate(); //페이지 이동

  const handleCreateClick = () => {
    navigate("post/create");
  };

  return (
    <>
      <nav
        className="
        fixed top-0 left-0 z-10 w-full h-14
        flex items-center justify-between px-12
        bg-[rgba(28,28,28,0.31)] backdrop-blur-md border-b border-white/10"
      >
        <h1
          className="
            text-xl font-semibold tracking-wide
            bg-linear-to-r
            from-white
            via-[#c9fa7c]
            to-[#2de668]
            bg-clip-text
            text-transparent
          "
        >
          <Link to="/"> Local Board</Link>
        </h1>
        <div className="flex items-center gap-3 [&_button]:cursor-pointer">
          {/* 글쓰기 버튼 */}
          <Button
            onClick={handleCreateClick}
            className="w-fit hover:bg-green-700 py-1 px-3"
          >
            글쓰기
          </Button>
        </div>
      </nav>
    </>
  );
}
