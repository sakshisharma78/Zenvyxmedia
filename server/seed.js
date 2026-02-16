const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

// Import models
const User = require('./models/User');
const Portfolio = require('./models/Portfolio');
const Testimonial = require('./models/Testimonial');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await Testimonial.deleteMany({});

        console.log('🗑️  Cleared existing data');

        // Create admin user
        // Note: Password 'admin' will be hashed by the User model's pre-save hook
        await User.create({
            email: 'zenvyxmedia@gmail.com',
            password: 'admin',
            role: 'admin',
        });

        console.log('👤 Admin user created (email: zenvyxmedia@gmail.com, password: admin)');

        // Create portfolio items
        const portfolioItems = [
            {
                title: 'Epic Gaming Montage',
                category: 'Editing',
                thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800',
                description: 'High-energy gaming montage with cinematic color grading and motion graphics',
                projectLink: 'https://youtube.com/watch?v=example1',
            },
            {
                title: 'Tech Review Thumbnail Pack',
                category: 'Thumbnails',
                thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
                description: 'Eye-catching thumbnail designs for tech review channel',
                projectLink: '',
            },
            {
                title: 'Creator Portfolio Website',
                category: 'Web Development',
                thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
                description: 'Modern portfolio website with custom animations and CMS integration',
                projectLink: 'https://example-portfolio.com',
            },
            {
                title: 'Brand Deal Campaign',
                category: 'Brand Deals',
                thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
                description: 'Successful partnership campaign with tech brand, 500K+ impressions',
                projectLink: '',
            },
            {
                title: 'Vlog Series Edit',
                category: 'Editing',
                thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
                description: 'Engaging vlog series with consistent branding and storytelling',
                projectLink: 'https://youtube.com/watch?v=example2',
            },
            {
                title: 'Social Media Graphics Pack',
                category: 'Thumbnails',
                thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
                description: 'Complete social media branding package with templates',
                projectLink: '',
            },
        ];

        await Portfolio.insertMany(portfolioItems);
        console.log(`📁 Created ${portfolioItems.length} portfolio items`);

        // Create testimonials
        const testimonials = [
            {
                name: 'Alex Turner',
                role: 'Tech YouTuber (500K subs)',
                feedback: 'Zenvyx transformed my content quality overnight. My engagement rates doubled and subscriber growth increased by 300%. The team truly understands what works on YouTube.',
                rating: 5,
            },
            {
                name: 'Sarah Chen',
                role: 'Lifestyle Creator',
                feedback: 'The thumbnail designs alone increased my CTR by 12%. Professional, fast, and they genuinely care about my success. Best investment I\'ve made in my channel.',
                rating: 5,
            },
            {
                name: 'Marcus Johnson',
                role: 'Gaming Streamer',
                feedback: 'From editing to branding to web development - Zenvyx does it all at an elite level. They don\'t just deliver work, they deliver results.',
                rating: 5,
            },
            {
                name: 'Emma Rodriguez',
                role: 'Fitness Coach',
                feedback: 'Working with Zenvyx was seamless. They understood my  vision and executed perfectly. My website looks incredible and my video quality has never been better.',
                rating: 5,
            },
            {
                name: 'David Kim',
                role: 'Business Consultant',
                feedback: 'The brand deal they secured for me was perfectly aligned with my audience. Professional negotiation and outstanding results. Highly recommend!',
                rating: 5,
            },
        ];

        await Testimonial.insertMany(testimonials);
        console.log(`⭐ Created ${testimonials.length} testimonials`);

        console.log('\n✨ Database seeded successfully!\n');
        console.log('🔑 Login credentials:');
        console.log('   Email: zenvyxmedia@gmail.com');
        console.log('   Password: admin\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedData();
