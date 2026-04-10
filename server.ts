import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route to fetch and parse project content
  app.get("/api/project-content", async (req, res) => {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      console.log(`Fetching content from: ${url}`);
      const response = await axios.get(url, {
        timeout: 8000, // 8 second timeout
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      const $ = cheerio.load(response.data);
      
      // Behance uses various containers. Let's try to find the main project modules.
      // Common Behance selectors: .project-modules, #project-modules, .project-canvas
      let $projectContent = $(".primary-project-content");
      
      if ($projectContent.length === 0) {
        $projectContent = $(".project-modules, #project-modules, .project-canvas, #project-canvas, .project-styles, #project-styles");
      }

      if ($projectContent.length === 0) {
        // Look for any container that has a lot of images
        const possibleContainers = $("div").filter((_, el) => $(el).find("img").length > 3);
        if (possibleContainers.length > 0) {
          $projectContent = possibleContainers.first();
        }
      }

      if ($projectContent.length === 0) {
        // Last resort: look for any div that might contain the main images
        $projectContent = $("main, article, #main-content, .main-content").first();
      }

      // Clean the content: We only want images, text, videos, and audio
      const cleanedElements: string[] = [];
      const seenSources = new Set<string>();

      $projectContent.find("img, p, h1, h2, h3, h4, h5, h6, picture, video, audio, iframe, .video-module, .audio-module").each((_, el) => {
        const $el = $(el);
        const tagName = el.tagName.toLowerCase();

        // Skip img tags that are inside a picture tag we've already handled or will handle
        if (tagName === "img" && $el.closest("picture").length > 0) {
          return;
        }

        if (tagName === "img" || tagName === "picture") {
          let src = "";
          let alt = "";

          if (tagName === "picture") {
            // Try to get the best source from picture
            const $source = $el.find("source").first();
            src = $source.attr("srcset") || $source.attr("data-srcset") || "";
            if (src && src.includes(",")) {
              src = src.split(",")[0].trim().split(" ")[0];
            }
            const $img = $el.find("img");
            if (!src) src = $img.attr("data-src") || $img.attr("src") || "";
            alt = $img.attr("alt") || "Project Image";
          } else {
            src = $el.attr("data-full-src") || 
                  $el.attr("data-src") || 
                  $el.attr("data-hi-res-src") ||
                  $el.attr("data-lazy-src") ||
                  $el.attr("src") || "";
            alt = $el.attr("alt") || "Project Image";
            
            const srcset = $el.attr("srcset") || $el.attr("data-srcset");
            if (srcset) {
              const sources = srcset.split(",").map(s => s.trim().split(" "));
              const largest = sources.sort((a, b) => {
                const valA = parseInt(a[1]) || 0;
                const valB = parseInt(b[1]) || 0;
                return valB - valA;
              })[0];
              if (largest && largest[0]) src = largest[0];
            }
          }
          
          // If it's a Behance image, try to get a high resolution
          if (src && src.includes("behance.net/project_modules/")) {
            if (!src.includes("max_3840") && !src.includes("max_1200") && !src.includes("fs/")) {
              src = src.replace(/max_\d+/, "max_1200");
            }
          }

          if (src && !src.includes("spacer.gif") && !src.includes("pixel.gif")) {
            const isIcon = src.includes("/avatars/") || src.includes("/icons/") || (src.includes("100x100") || src.includes("50x50"));
            
            if (!isIcon && !seenSources.has(src)) {
              seenSources.add(src);
              cleanedElements.push(`<img src="${src}" alt="${alt}" class="w-full h-auto rounded-none md:rounded-xl shadow-2xl mb-12 block" referrerPolicy="no-referrer" />`);
            }
          }
        } else if (tagName === "video") {
          let src = $el.attr("src") || 
                    $el.find("source").attr("src") || 
                    $el.attr("data-src") || 
                    $el.find("source").attr("data-src") ||
                    $el.attr("data-video-src");
          
          if (src) {
            cleanedElements.push(`
              <video 
                src="${src}" 
                controls 
                loop 
                muted 
                autoplay 
                playsinline 
                class="w-full h-auto rounded-none md:rounded-xl shadow-2xl mb-12 block bg-black"
              ></video>
            `);
          }
        } else if (tagName === "iframe") {
          let src = $el.attr("src") || $el.attr("data-src");
          if (src) {
            // Ensure it's a secure embed
            if (src.startsWith("//")) src = "https:" + src;
            
            // Style iframes for sound bites or video embeds
            const isAudio = src.includes("soundcloud") || src.includes("spotify") || src.includes("audio");
            const isVimeo = src.includes("vimeo");
            const isYouTube = src.includes("youtube") || src.includes("youtu.be");
            const isVideo = isVimeo || isYouTube || src.includes("video");
            
            // Try to enable autoplay and mute for videos
            if (isVideo) {
              if (isVimeo && !src.includes("autoplay=")) {
                src += (src.includes("?") ? "&" : "?") + "autoplay=1&muted=1&background=1";
              } else if (isYouTube && !src.includes("autoplay=")) {
                src += (src.includes("?") ? "&" : "?") + "autoplay=1&mute=1&enablejsapi=1";
              } else if (!src.includes("autoplay=")) {
                src += (src.includes("?") ? "&" : "?") + "autoplay=1&muted=1";
              }
            }
            
            const height = isAudio ? "166px" : "500px";
            
            cleanedElements.push(`
              <div class="w-full mb-12 rounded-none md:rounded-xl overflow-hidden shadow-2xl bg-zinc-900">
                <iframe 
                  src="${src}" 
                  width="100%" 
                  height="${height}" 
                  frameborder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  allowfullscreen
                  class="video-iframe"
                ></iframe>
              </div>
            `);
          }
        } else if (tagName === "audio") {
          let src = $el.attr("src") || 
                    $el.find("source").attr("src") || 
                    $el.attr("data-src") ||
                    $el.find("source").attr("data-src");
          if (src) {
            cleanedElements.push(`
              <div class="w-full mb-12 p-6 bg-zinc-900 rounded-none md:rounded-xl shadow-2xl">
                <audio src="${src}" controls class="w-full"></audio>
              </div>
            `);
          }
        } else if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
          const text = $el.text().trim();
          if (text) {
            cleanedElements.push(`<${tagName} class="font-display uppercase tracking-wider text-white mt-12 mb-6">${text}</${tagName}>`);
          }
        } else if (tagName === "p") {
          const text = $el.text().trim();
          if (text) {
            cleanedElements.push(`<p class="text-white/80 leading-relaxed mb-6 text-lg">${text}</p>`);
          }
        }
      });

      const content = cleanedElements.join("\n");

      if (!content || content.trim().length === 0) {
        return res.status(404).json({ error: "No project content could be extracted." });
      }

      res.json({ content });
    } catch (error) {
      console.error("Error fetching project content:", error);
      res.status(500).json({ error: "Failed to fetch project content" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
