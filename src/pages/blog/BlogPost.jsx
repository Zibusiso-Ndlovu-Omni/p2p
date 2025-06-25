import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';

const BlogPost = () => {
  const { id } = useParams();

  // This would typically come from an API or database
  const blogPost = {
    id: 1,
    title: "P2P Expo 2024: Breaking Records with 500+ Exhibitors",
    content: `
      <p>This year's P2P Expo promises to be the largest gathering of freight and logistics professionals in the industry's history. With over 500 confirmed exhibitors from around the globe, we're setting new standards for what a logistics exhibition can achieve.</p>
      
      <h2>Record-Breaking Participation</h2>
      <p>The overwhelming response from industry leaders has exceeded all our expectations. Companies from 45 countries have confirmed their participation, representing every sector of the freight and logistics ecosystem:</p>
      
      <ul>
        <li>Freight forwarders and logistics providers</li>
        <li>Technology and software solutions</li>
        <li>Transportation and shipping companies</li>
        <li>Warehousing and distribution centers</li>
        <li>Supply chain management specialists</li>
      </ul>
      
      <h2>What to Expect</h2>
      <p>This year's exhibition will feature expanded floor space to accommodate the increased number of exhibitors while maintaining the high-quality networking environment our attendees expect. Key highlights include:</p>
      
      <blockquote>
        "We're not just growing in size – we're growing in impact. Every square foot of exhibition space represents innovation, connection, and opportunity for the freight industry." - Event Director, Jane Smith
      </blockquote>
      
      <h2>Special Features for 2024</h2>
      <p>To enhance the experience for both exhibitors and visitors, we're introducing several new features:</p>
      
      <ul>
        <li>Interactive technology showcase zones</li>
        <li>Live demonstration areas</li>
        <li>Dedicated networking lounges</li>
        <li>Expert-led panel discussions</li>
        <li>Startup pitch competition</li>
      </ul>
      
      <h2>Registration Information</h2>
      <p>With this level of participation, we expect visitor registration to reach capacity quickly. We strongly encourage early registration to secure your spot at this landmark event.</p>
      
      <p>For more information about exhibiting opportunities or to register as a visitor, contact our team today.</p>
    `,
    author: "Sarah Mitchell",
    date: "2024-06-20",
    image: "/api/placeholder/800/400",
    category: "event-announcements",
    readTime: "5 min read",
    tags: ["exhibition", "logistics", "freight", "networking", "industry-news"]
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Digital Transformation Trends in Logistics for 2024",
      image: "/api/placeholder/300/200",
      date: "2024-06-15"
    },
    {
      id: 3,
      title: "Sustainable Freight: Green Logistics Takes Center Stage",
      image: "/api/placeholder/300/200",
      date: "2024-06-12"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
          />
          
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {blogPost.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span className="font-medium">{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{new Date(blogPost.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <span>{blogPost.readTime}</span>
            </div>
            
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <ShareIcon className="w-4 h-4" />
              Share
            </button>
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Join P2P Expo 2024?</h3>
          <p className="text-lg mb-6 opacity-90">
            Don't miss out on the industry's premier logistics and freight exhibition
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/registration"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register Now
            </Link>
            <Link
              to="/exhibit"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Become an Exhibitor
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;