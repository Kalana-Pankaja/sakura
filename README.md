# Sakura 🌸

A multilingual AI-powered music and lyrics generation platform that transforms emotions into beautiful songs. Create personalized lyrics in English, Sinhala, or Tamil and generate accompanying audio tracks using advanced AI models.

## ✨ Features

- **🎵 AI-Powered Lyrics Generation**: Transform your emotions and thoughts into personalized lyrics
- **🌍 Multi-Language Support**: Create content in English, Sinhala, and Tamil
- **🎧 Audio Generation**: Convert lyrics into beautiful music using MMAudio AI
- **😊 Emotion-Based Creation**: Select from 8 core emotions (Joy, Sadness, Love, Anger, Fear, Hope, Nostalgia, Excitement)
- **🎨 Customizable Music Styles**: Choose from Pop, Rock, Classical, and Folk genres
- **📱 Responsive Design**: Beautiful, modern interface built with Tailwind CSS
- **📚 History Tracking**: Keep track of your creations and revisit them anytime
- **🎭 Intensity Control**: Adjust the emotional intensity from calm to passionate

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 2.x with TypeScript
- **Styling**: Tailwind CSS 4.0 with custom rose theme
- **API Integration**: Googlr API for lyrics genaration
- **Deployment**: Vercel adapter ready
- **Development**: Vite for fast development and hot reload

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kalana-Pankaja/sakura
cd sakura
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your API key:
```env
SUNO_API_KEY=your_goapi_ai_key_here
```

4. Start the development server:
```bash
npm run dev
# or start with browser auto-open
npm run dev -- --open
```

The application will be available at `http://localhost:5173`

## 🎯 Usage

### Creating Lyrics

1. **Select Emotions**: Choose one or more emotions that represent your current feelings
2. **Describe Your Emotions**: Add detailed descriptions in the text area
3. **Choose Language**: Select from English, Sinhala (සිංහල), or Tamil (தமிழ்)
4. **Generate**: Click "Generate Lyrics" to create your personalized content

### Creating Songs

1. **Generate Lyrics First**: Create lyrics using the process above
2. **Configure Audio Settings**: 
   - Music Style: Pop, Rock, Classical, or Folk
   - Intensity: Calm & Gentle, Moderate, or Intense & Passionate
   - Length: Short (2-3 verses), Medium (4-5 verses), or Long (6+ verses)
3. **Generate Song**: Transform your lyrics into audio using AI

### Viewing History

- Access the History tab to view all your previous creations
- Revisit and listen to your generated songs
- Track your creative journey over time

## 📁 Project Structure

```
src/
├── lib/                    # Reusable components and utilities
│   ├── stores/            # Svelte stores for state management
│   │   ├── history.ts     # History tracking
│   │   ├── language.ts    # Language preferences
│   │   └── theme.ts       # Theme management
│   ├── Footer.svelte      # Footer component
│   ├── Header.svelte      # Header component
│   ├── LanguageSelector.svelte
│   ├── LyricsLanguageSelector.svelte
│   └── ThemeToggle.svelte
├── routes/                # SvelteKit routes
│   ├── api/              # API endpoints
│   │   ├── generate-lyrics/
│   │   ├── generate-song/
│   │   └── song-status/
│   ├── about/            # About page
│   ├── features/         # Features page
│   ├── history/          # History page
│   ├── lyrics/           # Lyrics generation page
│   └── song/             # Song generation page
└── app.html              # HTML template
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript and Svelte checks
- `npm run format` - Format code with Prettier
- `npm run lint` - Check code formatting

### API Endpoints

- `POST /api/generate-lyrics` - Generate lyrics from emotions and keywords
- `POST /api/generate-song` - Create audio from lyrics
- `GET /api/song-status/[taskId]` - Check song generation status

## 🎨 Theming

The application uses a custom rose-themed color palette with CSS custom properties:
- `--rose-accent`: Primary accent color
- `--rose-deep`: Deep rose for gradients
- Dark/light mode support with automatic system preference detection

## 🌐 Deployment

### Vercel (Recommended)

The project is pre-configured for Vercel deployment:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add your `SUNO_API_KEY` environment variable in Vercel settings
4. Deploy automatically

### Other Platforms

For other deployment targets, you may need to install a different [SvelteKit adapter](https://kit.svelte.dev/docs/adapters).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI audio generation powered by [GoAPI.ai](https://goapi.ai/)
- Icons and emojis for enhanced user experience

## ⏭️ Futher developments

- The product is made until the audio generate but the SUNO AI but the lyrics are generate via Claude AI tools . Due to the fact that we need addditional licensing issues and also need to pay to get those API accessing that part of the software is not currently working. But all the code development that need to integrate suno Ai is coded in the dev-chanith branch and you can refer that part on it.
- Futher the downloading ability of files needs to be added after audio generation
---

**Transform your emotions into music with Sakura 🌸**
