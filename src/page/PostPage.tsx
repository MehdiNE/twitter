import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { dimModeState, lightModeState, modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import TransitionsModal from "../components/ModalPage";
import Comment from "../components/Comment";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import { BsArrowLeft } from "react-icons/bs";
import RightSidebar from "../components/right sidebar/RightSidebar";

function PostPage() {
  const [isOpen] = useRecoilState(modalState);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);
  const navigate = useNavigate();

  let { id }: any = useParams();

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot: any) => {
        setPost(snapshot.data());
      }),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) => setComments(snapshot.docs)
      ),
    [id]
  );

  return (
    <div>
      <main
        className={`dark:bg-black min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
          lightTheme && "bg-white"
        } ${dimTheme && "bg-[#15202b]"}`}
      >
        <Sidebar />
        <div
          className={`flex-grow border-l border-r max-w-2xl sm:ml-[73px] xl:ml-[370px] ${
            lightTheme ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <div
            className={`flex items-center px-1.5 py-2 border-b dark:  font-semibold text-xl gap-x-4 sticky top-0 z-50 dark:bg-black/80  backdrop-blur-md ${
              lightTheme
                ? "border-gray-200 text-black bg-slate-100/80"
                : "border-gray-700 text-[#d9d9d9]"
            } ${dimTheme && "bg-[#15202b] bg-opacity-80"}`}
          >
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => navigate("/")}
            >
              <BsArrowLeft size={18} className="h-5" />
            </div>
            Tweet
          </div>

          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment: any) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>
        <RightSidebar />
        {/* <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        /> */}

        {isOpen && <TransitionsModal />}
      </main>
    </div>
  );
}

export default PostPage;
