"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  ImageIcon,
  Smile,
  Link2,
} from "lucide-react";
import { useTranslation } from "react-i18next"; // যোগ হলো

function DashboardSocialFeed() {
  const { t } = useTranslation(); // যোগ হলো
  const [activeTab, setActiveTab] = useState("social");
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [shareText, setShareText] = useState("");

  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/what-type-of-learner-is-your-child-min-scaled_mkm8a1.jpg",
      timeAgo: t("hours_ago", { count: 2 }),
      content: "STLA + Fiserv @ $342.00",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec et cum sed pellentesque sagittis risus.",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
      likes: 12,
      commentCount: 7,
      comments: [
        {
          id: 1,
          author: "Erin Johnson",
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec et cum sed pellentesque sagittis risus.",
          replies: [
            {
              id: 1,
              author: "Mike Johnson",
              avatar:
                "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec et cum sed pellentesque sagittis risus.",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      author: "Sarah Chen",
      avatar:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/look-up.jpg",
      timeAgo: t("hours_ago", { count: 2 }),
      content: "RIVN: STLA + Fiserv @ $242.00",
      description:
        "Long term bull. Love the new Cybertruck production numbers!",
      likes: 18,
      commentCount: 3,
      comments: [
        {
          id: 1,
          author: "Erin Johnson",
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
          text: "Great analysis! The production numbers are impressive.",
          replies: [],
        },
      ],
    },
  ];

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, text) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  return (
    <div className="container mx-auto">
      <div className="bg-gray-50 rounded-2xl border-gray-200 p-4">
        {/* Share Input */}
        <div className="flex gap-3 mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
            alt={t("your_avatar")}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder={t("share_something")}
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="flex-1 bg-white rounded-full px-4 py-3 text-sm focus:outline-none"
            />
            <button className="text-gray-500 hover:text-gray-700">
              <ImageIcon size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Link2 size={20} />
            </button>
            <button className="bg-blue-500 text-white px-4 py-[1px] rounded-xl text-[16px] font-medium hover:bg-blue-600">
              {t("post")}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 pt-4">
        <button
          onClick={() => setActiveTab("social")}
          className={`pb-2 font-medium text-[19px] ${
            activeTab === "social"
              ? "text-gray-900 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("social_feed")}
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`pb-2 font-medium text-[19px] ${
            activeTab === "my"
              ? "text-gray-900 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("my_feed")}
        </button>
      </div>

      {/* Posts Feed */}
      <div className="py-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 rounded-2xl mb-3 border-b border-gray-200 px-4 pt-4"
          >
            {/* Post Header */}
            <div className="flex gap-3 mb-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[18px]">
                    {post.author}
                  </span>
                  <span className="text-gray-500 text-[14px]">
                    {post.timeAgo}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600 bg-gray-200 px-3 rounded-md">
                    {t("sell")}
                  </p>
                  <p className="text-[16px] text-gray-600">{post.content}</p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-3 pl-[60px]">
              <p className="text-[17px] font-medium mb-5">
                {post.description}
              </p>
              {post.image && (
                <img
                  src={post.image}
                  alt={t("post_image")}
                  className="w-[60vh] rounded-lg mb-3 max-h-64 object-cover"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex text-black items-center gap-4 pb-3 pl-[60px]">
              <button className="flex gap-1 cursor-pointer py-2 rounded text-sm">
                <Heart size={18} />
                <span className="font-semibold">{post.likes}</span>
              </button>
              <button
                onClick={() => toggleComments(post.id)}
                className="flex gap-1 cursor-pointer py-2 rounded text-sm"
              >
                <MessageCircle size={18} />
                <span className="font-semibold">{post.commentCount}</span>
              </button>
            </div>

            {/* Comments Section */}
            {expandedComments[post.id] && (
              <div className="space-y-3 pb-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2 pl-2">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 pl-[12px]">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <p className="font-semibold">{comment.author}</p>
                        <p className="text-sm font-medium text-gray-700">
                          {comment.text}
                        </p>
                      </div>
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="mt-2 ml-4 flex gap-2">
                          <img
                            src={reply.avatar}
                            alt={reply.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="bg-gray-100 rounded-lg p-2">
                              <p className="text-xs font-semibold">
                                {reply.author}
                              </p>
                              <p className="text-sm font-medium text-gray-700">
                                {reply.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Comment Input */}
                <div className="flex gap-2 mt-3">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    alt={t("your_avatar")}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder={t("write_comment")}
                      value={newComment[post.id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post.id, e.target.value)
                      }
                      className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm focus:outline-none"
                    />
                    <button className="text-gray-500 hover:text-gray-700">
                      <ImageIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSocialFeed;