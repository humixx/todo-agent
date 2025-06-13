# Todo Agent

A modern, AI-powered Todo application built with Next.js, React, and CopilotKit. This project helps you manage your daily tasks efficiently, with a clean UI and smart features.

---

## 🎥 Demo

[Watch a walkthrough on Loom](https://www.loom.com/share/17b66b7517dd487093b8c6c87540ebd0)

---

## Features

- **Task Management:** Add, edit, complete, and delete todos.
- **AI Assistance:** Integrates CopilotKit for smart suggestions and productivity tips.
- **Responsive UI:** Built with Radix UI and Tailwind CSS for a seamless experience on all devices.
- **Persistent Storage:** Tasks are saved locally or via backend (customizable).
- **Animations:** Smooth transitions using Framer Motion.

## How It Works

- The app uses **Next.js** for server-side rendering and routing.
- **React** manages the UI and state.
- **CopilotKit** provides AI-powered features and suggestions.
- **Radix UI** and **Tailwind CSS** are used for accessible, customizable components and styling.
- **Framer Motion** adds interactive animations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn, but pnpm is preferred)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/humixx/todo-agent.git
   cd todo-agent
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in any required values (if applicable).

### Running Locally

```sh
pnpm dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```sh
pnpm build
pnpm start
```

### Running Tests

```sh
pnpm test
```
*(If tests are set up in your project)*

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/):

1. Push your code to GitHub/GitLab/Bitbucket.
2. Import your repo into Vercel.
3. Set any required environment variables.
4. Click **Deploy**.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [CopilotKit](https://www.copilotkit.ai/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

*Made with ❤️ by Humaira*
