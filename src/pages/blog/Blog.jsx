import React, { useState } from 'react';
import { CalendarIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample blog articles data
  const articles = [
    {
      id: 1,
      title: "P2P Expo 2024: Breaking Records with 500+ Exhibitors",
      excerpt: "This year's exhibition promises to be the largest gathering of freight and logistics professionals...",
      category: "event-announcements",
      author: "Sarah Mitchell",
      date: "2024-06-20",
      image: "/api/placeholder/400/240",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Spotlight: Global Freight Solutions - Innovation in Action",
      excerpt: "Meet our featured sponsor Global Freight Solutions and discover how they're revolutionizing supply chain management...",
      category: "featured-sponsors",
      author: "Mike Johnson",
      date: "2024-06-18",
      image: "/api/placeholder/400/240",
      readTime: "3 min read",
      featured: false
    },
    {
      id: 3,
      title: "Digital Transformation Trends in Logistics for 2024",
      excerpt: "Explore the latest technological advances reshaping the freight and logistics industry...",
      category: "trade-updates",
      author: "Emma Davis",
      date: "2024-06-15",
      image: "/api/placeholder/400/240",
      readTime: "7 min read",
      featured: true
    },
    {
      id: 4,
      title: "Sustainable Freight: Green Logistics Takes Center Stage",
      excerpt: "Environmental consciousness is driving major changes in how freight companies operate...",
      category: "trade-updates",
      author: "James Wilson",
      date: "2024-06-12",
      image: "/api/placeholder/400/240",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 5,
      title: "New Partnership Announcement: Tech Logistics Corp",
      excerpt: "We're excited to welcome Tech Logistics Corp as our platinum sponsor for this year's exhibition...",
      category: "featured-sponsors",
      author: "Lisa Chen",
      date: "2024-06-10",
      image: "/api/placeholder/400/240",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 6,
      title: "Early Bird Registration Now Open - Save 30%",
      excerpt: "Don't miss out on early bird pricing for P2P Expo 2024. Register now and save significantly...",
      category: "event-announcements",
      author: "Tom Anderson",
      date: "2024-06-08",
      image: "/api/placeholder/400/240",
      readTime: "2 min read",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'event-announcements', name: 'Event Announcements' },
    { id: 'featured-sponsors', name: 'Featured Sponsors' },
    { id: 'trade-updates', name: 'Trade Updates' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              P2P Expo News & Updates
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Stay informed with the latest exhibition news, industry insights, 
              and sponsor highlights from the freight and logistics world
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'all' && featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      <Link to={`/blog/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name}`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <TagIcon className="w-4 h-4" />
                    <span className="capitalize">
                      {article.category.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest exhibition news and industry insights
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;