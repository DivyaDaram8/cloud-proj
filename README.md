# Tee Studio - 3D T-Shirt Customizer

Tee Studio is an interactive web-based 3D T-shirt customizer built with **React**, **Three.js**, **TailwindCSS**, and **Framer Motion**. Users can personalize shirts with colors, textures, logos, or custom text and download the final output.

🚀 **Live Demo:** [https://tee-studio.pages.dev/](https://tee-studio.pages.dev/)

---

## ✨ Features

- 🎨 Real-time 3D shirt customization with smooth animations  
- 🖼 Upload your own logos or textures  
- 🧵 Add custom text with styling options  
- 🎯 Toggle visibility between logo, stylish patterns, and text on the shirt  
- 💾 Download final design as a PNG image  
- ⌨ Keyboard shortcut: `Alt + Q` to return to intro screen

---

## 🛠 Tech Stack & Tools

- **React** — A JavaScript library for building user interfaces using reusable components, allowing fast and interactive UI development.  
- **Vite** — A lightning-fast frontend build tool and development server optimized for modern frameworks like React.  
- **Three.js** — A powerful 3D library that runs in the browser, used here to render and manipulate the 3D T-shirt model interactively.  
- **TailwindCSS** — A utility-first CSS framework that lets you style elements by composing small, reusable classes directly in your markup.  
- **Framer Motion** — A React library for declarative animations and smooth transitions, enhancing user experience with motion effects.  
- **Valtio** — A simple and reactive state management library for React that makes it easy to manage and update app state seamlessly.

---

## 📦 Setup Instructions (Run Locally)

```bash
# Clone the repository
git clone https://github.com/divyadaram8/cloud-proj.git
cd cloud-proj

# Install dependencies
npm install

# Start the development server
npm run dev
## 🚀 Deployment on Cloudflare Pages

To deploy your project live using Cloudflare Pages, follow these steps:

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and log in or create a free account.

2. Click **Create a Project** and connect your GitHub account.

3. Select your repository (`cloud-proj`) from the list.

4. Configure build settings:

   - **Framework preset:** Select **Vite** (or **None** if not available)  
   - **Build command:**  
     ```bash
     npm run build
     ```
   - **Build output directory:**  
     ```
     dist
     ```

5. Click **Save and Deploy**.

Cloudflare Pages will build your app and deploy it. Your live site will be available at a URL like `https://your-project.pages.dev`.

---

## 🌐 Live Demo

Try the project live here:  
[https://tee-studio.pages.dev/](https://tee-studio.pages.dev/)
