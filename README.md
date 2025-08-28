# 🌍 TerraAlert Dashboard

A modern, futuristic web application for monitoring, analyzing, and simulating natural disasters in real-time. Built with cutting-edge technologies and featuring a sleek red-black theme with stunning 3D visualizations and smooth animations.

![TerraAlert Dashboard](https://via.placeholder.com/800x400/0d0d0d/ff1a1a?text=TerraAlert+Dashboard)

## ✨ Features

### 🏠 **Home Page**
- **3D Rotating Globe**: Interactive Earth visualization with glowing disaster hotspots
- **Animated Hero Section**: Smooth fade-in animations with futuristic typography
- **Feature Showcase**: Glassmorphism cards highlighting key capabilities
- **Live Statistics**: Real-time counters with animated number displays

### 📊 **Disaster Dashboard**
- **Interactive Flip Cards**: Hover to reveal detailed disaster information
- **Real-time Monitoring**: Live data for earthquakes, floods, wildfires, and storms
- **Activity Feed**: Continuous updates on global disaster events
- **Statistical Overview**: Key metrics with animated counters

### 🎮 **Simulation Mode**
- **Real-time Charts**: Dynamic visualization using Recharts library
- **Multiple Disaster Types**: Earthquake, flood, wildfire, and hurricane simulations
- **Interactive Controls**: Play, pause, and reset simulation functionality
- **Impact Analysis**: Economic loss, casualties, and infrastructure damage tracking
- **Parameter Adjustment**: Customizable simulation variables

### 🚨 **Alerts System**
- **Sliding Sidebar**: Smooth animations with backdrop blur
- **Pulse Animations**: Eye-catching alert indicators
- **Severity Classification**: Color-coded alert levels (Critical, High, Medium)
- **Real-time Updates**: Live notification system

### 🎨 **Design Features**
- **Futuristic Theme**: Dark background (#0d0d0d) with red highlights (#ff1a1a)
- **Glassmorphism Effects**: Modern translucent UI elements
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Neon Glow Effects**: Interactive hover states with red glow

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.5
- **Animations**: Framer Motion 10.16.4
- **3D Graphics**: React Three Fiber 8.15.11 + Three.js 0.157.0
- **Charts**: Recharts 2.8.0
- **Routing**: React Router DOM 6.8.1
- **Icons**: Lucide React 0.292.0
- **Build Tool**: Create React App 5.0.1

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd terraalert-dashboard
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Step 4: Build for Production
```bash
npm run build
```

## 🚀 Quick Start Guide

1. **Home Page**: Navigate through the animated hero section and explore features
2. **Dashboard**: View real-time disaster data with interactive flip cards
3. **Simulation**: Select a disaster type and run real-time impact simulations
4. **Alerts**: Click the alert button (top-right) to view live disaster notifications

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with all animations
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Streamlined interface with collapsible navigation

## 🎯 Key Components

### Navigation
- **Sticky Header**: Transparent navbar with smooth scroll effects
- **Mobile Menu**: Collapsible navigation for smaller screens
- **Active States**: Visual indicators for current page

### 3D Visualizations
- **Globe Component**: Rotating Earth with disaster markers
- **Particle Effects**: Floating elements with physics-based animations
- **Interactive Markers**: Clickable disaster hotspots with information

### Data Visualization
- **Line Charts**: Time-series data for disaster progression
- **Area Charts**: Infrastructure damage visualization
- **Bar Charts**: Economic impact analysis
- **Pie Charts**: Impact distribution summaries

## 🎨 Custom Styling

### Color Palette
```css
--disaster-red: #ff1a1a
--disaster-dark: #0d0d0d
--disaster-gray: #1a1a1a
--disaster-light-gray: #2a2a2a
```

### Typography
- **Primary Font**: Orbitron (futuristic headings)
- **Secondary Font**: Poppins (body text)

### Animations
- **Glow Effects**: Red neon glow on hover
- **Pulse Animations**: Alert indicators
- **Float Effects**: Subtle floating elements
- **Page Transitions**: Smooth route changes

## 📊 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/600x400/0d0d0d/ff1a1a?text=Home+Page+with+3D+Globe)

### Dashboard
![Dashboard](https://via.placeholder.com/600x400/0d0d0d/ff1a1a?text=Interactive+Disaster+Dashboard)

### Simulation
![Simulation](https://via.placeholder.com/600x400/0d0d0d/ff1a1a?text=Real-time+Simulation+Charts)

### Mobile View
![Mobile](https://via.placeholder.com/300x600/0d0d0d/ff1a1a?text=Mobile+Responsive+Design)

## 🔧 Configuration

### Tailwind Configuration
The project uses custom Tailwind configuration with:
- Extended color palette for disaster theme
- Custom animations and keyframes
- Futuristic font family integration
- Glassmorphism utility classes

### Environment Variables
Create a `.env` file for any API keys or configuration:
```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_MAP_API_KEY=your_map_api_key
```

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Vercel Deployment
1. Connect your repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy with automatic CI/CD

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Three Fiber** for amazing 3D capabilities
- **Framer Motion** for smooth animations
- **Recharts** for beautiful data visualizations
- **Tailwind CSS** for rapid styling
- **Lucide React** for consistent iconography

## 📞 Support

For support, email support@terraalert.com or join our Slack channel.

---

**Built with ❤️ and ⚡ for disaster preparedness and response**
