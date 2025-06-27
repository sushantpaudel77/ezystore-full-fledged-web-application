import React from "react";
import PageTitle from "./PageTitle";
import {
  FaStar,
  FaLightbulb,
  FaSmile,
  FaHeart,
  FaTruck,
  FaLayerGroup,
} from "react-icons/fa";

export default function About() {
  const features = [
    {
      title: "Premium Quality",
      icon: <FaStar className="text-3xl" />,
      color: "text-yellow-500",
      bgGradient: "from-yellow-500/20 to-orange-400/20",
      hoverGradient: "from-yellow-500/30 to-orange-400/30",
      borderGradient: "from-yellow-500 to-orange-400",
      description:
        "Every sticker is printed with love using high-grade vinyl and clean lamination — giving your gear a bold yet polished look.",
    },
    {
      title: "Product Innovation",
      icon: <FaLightbulb className="text-3xl" />,
      color: "text-blue-500",
      bgGradient: "from-blue-500/20 to-cyan-400/20",
      hoverGradient: "from-blue-500/30 to-cyan-400/30",
      borderGradient: "from-blue-500 to-cyan-400",
      description:
        "Matte or glossy, scratch-resistant and waterproof — our stickers are tech-safe and adventure-ready.",
    },
    {
      title: "Excellent Service",
      icon: <FaSmile className="text-3xl" />,
      color: "text-green-500",
      bgGradient: "from-green-500/20 to-emerald-400/20",
      hoverGradient: "from-green-500/30 to-emerald-400/30",
      borderGradient: "from-green-500 to-emerald-400",
      description:
        "Your satisfaction fuels us. We promise quick responses, fast shipping, and hassle-free resolutions.",
    },
    {
      title: "Designs You'll Love",
      icon: <FaHeart className="text-3xl" />,
      color: "text-rose-500",
      bgGradient: "from-rose-500/20 to-pink-400/20",
      hoverGradient: "from-rose-500/30 to-pink-400/30",
      borderGradient: "from-rose-500 to-pink-400",
      description:
        "From funny to fandom, minimalist to meme — explore a collection curated for every vibe. And we're just getting started.",
    },
    {
      title: "Fast & Reliable Shipping",
      icon: <FaTruck className="text-3xl" />,
      color: "text-orange-500",
      bgGradient: "from-orange-500/20 to-red-400/20",
      hoverGradient: "from-orange-500/30 to-red-400/30",
      borderGradient: "from-orange-500 to-red-400",
      description:
        "We make sure your favorite designs reach you quickly and securely, right at your doorstep.",
    },
    {
      title: "Endless Variety",
      icon: <FaLayerGroup className="text-3xl" />,
      color: "text-purple-500",
      bgGradient: "from-purple-500/20 to-violet-400/20",
      hoverGradient: "from-purple-500/30 to-violet-400/30",
      borderGradient: "from-purple-500 to-violet-400",
      description:
        "We offer a massive collection to match every mood, niche, or obsession — so you'll never run out of ways to express yourself.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/5 to-orange-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Header Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-[3rem] blur-3xl"></div>
          <div className="relative backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 rounded-[3rem] p-12 border border-white/50 dark:border-gray-700/50 shadow-2xl shadow-gray-200/20 dark:shadow-gray-900/20">
            <PageTitle
              title="Our Story"
              subtitle="More than just stickers"
              className="mb-8"
            />
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ezy sticker
                </span>{' '}
                is not just a sticker shop — it's a creative movement brought to you by{' '}
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Designs by Sushant
                </span>.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We're here to transform your laptops, bottles, phones, and notebooks into stories — one sticker at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
              Why Choose Us?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`relative p-8 rounded-[2rem] backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50 shadow-xl shadow-gray-200/20 dark:shadow-gray-900/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/50`}>
                  
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`${feature.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 backdrop-blur-sm">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Top Border Accent - Fixed */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out rounded-t-[2rem]`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-[3rem] backdrop-blur-xl bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-gray-800/80 dark:to-gray-700/80 border border-white/50 dark:border-gray-600/50 shadow-2xl shadow-gray-200/20 dark:shadow-gray-900/30">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50"></div>
            <div className="relative p-12 text-center">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Our Mission
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                To empower self-expression through high-quality, creative stickers that help you personalize your world.
                We believe the little details make life more colorful, and we're committed to bringing that color to you.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-[3rem] shadow-2xl shadow-gray-200/20 dark:shadow-gray-900/30 border border-white/50 dark:border-gray-700/50 p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-inner">
                  <FaSmile className="text-4xl text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent mb-6">
                  From the Founder
                </h3>
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6 relative">
                  <div className="absolute -top-2 -left-2 text-4xl text-blue-500/30 dark:text-blue-400/30">"</div>
                  What started as a passion project in my dorm room has grown into a community of sticker lovers across the country.
                  Every design tells a story, and we're honored to help you tell yours.
                  <div className="absolute -bottom-2 -right-2 text-4xl text-blue-500/30 dark:text-blue-400/30">"</div>
                </blockquote>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">
                    Sushant, Founder & Chief Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}