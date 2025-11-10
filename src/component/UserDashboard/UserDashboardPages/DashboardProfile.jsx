"use client";

import { Heart, ImageIcon, MessageCircle } from "lucide-react";
import { useState } from "react";
import DashboardProfileProtfolio from "./DashboardProfileProtfolio";
import { useTranslation } from "react-i18next"; // যোগ হলো

export default function DashboardProfile() {
  const { t } = useTranslation(); // যোগ হলো
  const [activeTab, setActiveTab] = useState("content");
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/what-type-of-learner-is-your-child-min-scaled_mkm8a1.jpg",
      timestamp: t("hours_ago", { count: 2 }),
      tag: "STOCKS",
      stock: "STSL A",
      shares: t("shares", { count: 5 }),
      price: "$242.50",
      content: "Long-term hold. Love the new Cybertruck production numbers!",
      likes: 12,
      commentCount: 3,
      comments: [
        {
          id: 1,
          author: "Erin Johnson",
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec diam sed sed ultricies pharetra. Pretium tempus sed ut ultricies.",
          replies: [
            {
              id: 1,
              author: "Erin Johnson",
              avatar:
                "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec diam sed sed ultricies pharetra.",
            },
          ],
        },
        {
          id: 2,
          author: "Erin Johnson",
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec diam sed sed ultricies pharetra. Pretium tempus sed ut ultricies.",
          replies: [],
        },
        {
          id: 3,
          author: "Erin Johnson",
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec diam sed sed ultricies pharetra. Pretium tempus sed ut ultricies.",
          replies: [],
        },
      ],
    },
    {
      id: 2,
      author: "Sarah Chen",
      avatar:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529173/samples/two-ladies.jpg",
      timestamp: t("hours_ago", { count: 2 }),
      tag: "STOCKS",
      stock: "STSL A",
      shares: t("shares", { count: 5 }),
      price: "$242.50",
      content:
        "The market has shown mixed performance today, with certain sectors gaining momentum while others faced downward pressure due to global uncertainties. Investor confidence remains steady, and trading volumes suggest cautious optimism. If the current trend continues, we may experience a short-term pullback in prices. However, the long-term outlook, particularly in sectors such as technology and energy, appears promising. Staying informed and making careful investment decisions will be key in the coming weeks.",
      likes: 12,
      commentCount: 3,
      comments: [
        {
          id: 1,
          author: "Erin Johnson",
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nec diam sed sed ultricies pharetra. Pretium tempus sed ut ultricies.",
          replies: [],
        },
      ],
    },
  ];

  return (
    <div className="w-full container mx-auto bg-white">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <img
              src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg"
              alt="Jhon"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="lg:text-[30px] text-[24px] font-bold text-gray-900">
                Jhon
              </h2>
              <p className="text-sm lg:text-[18px] text-gray-600">
                xyz@gmail.com
              </p>
              <div className="flex gap-4 mt-2 lg:text-[16px] text-sm text-gray-600">
                <span>
                  <span className="font-semibold text-gray-900">40</span>{" "}
                  {t("followers")}
                </span>
                <span>
                  <span className="font-semibold text-gray-900">12k</span> {t("liked")}
                </span>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
            {t("follow")}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 px-6">
        <button
          onClick={() => setActiveTab("content")}
          className={`py-4 px-4 font-medium text-sm lg:text-[18px] ${
            activeTab === "content"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t("content")}
        </button>
        <button
          onClick={() => setActiveTab("portfolio")}
          className={`py-4 px-4 font-medium text-sm lg:text-[18px] ${
            activeTab === "portfolio"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {t("portfolio")}
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "content" && (
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
                        {post.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600 bg-purple-100 px-3 rounded-md font-semibold">
                        {t("stocks")}
                      </p>
                      <p className="text-[16px] text-gray-600">
                        {post.stock} {post.shares} @ {post.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-3 pl-[60px]">
                  <p className="text-[17px] font-medium mb-5">{post.content}</p>
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
                            <p className="font-semibold text-sm">
                              {comment.author}
                            </p>
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
        )}

        {activeTab === "portfolio" && (
          <div>
            <DashboardProfileProtfolio />
          </div>
        )}
      </div>
    </div>
  );
}