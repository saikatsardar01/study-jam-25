// import axios from 'axios';
// import * as cheerio from 'cheerio';

// const TARGET_BADGES = [
// "Level 3: Generative AI",
// "The Basics of Google Cloud Compute",
// "Develop Gen AI Apps with Gemini and Streamlit",
// "Prompt Design in Vertex AI",
// "Analyze Speech and Language with Google APIs",
// "Monitoring in Google Cloud",
// "Cloud Speech API: 3 Ways",
// "App Engine: 3 Ways",
// "Cloud Run Functions: 3 Ways",
// "Store, Process, and Manage Data on Google Cloud - Console",
// "Develop with Apps Script and AppSheet",
// "Set Up a Google Cloud Network",
// "Build a Website on Google Cloud",
// "App Building with AppSheet",
// "Get Started with Google Workspace Tools", 
// "Get Started with Dataplex",
// "Get Started with Looker",
// "Get Started with API Gateway",
// "Get Started with Pub/Sub",
// "Get Started with Cloud Storage",
// ];

// function getProfileUrls() {
//   return Object.entries(process.env)
//     .filter(([key]) => key.startsWith('PROFILE_'))
//     .map(([_, value]) => value);
// }

// async function scrapeBadges(url) {
//   try {
//     const { data } = await axios.get(url, {
//       headers: { 'User-Agent': 'Mozilla/5.0' }
//     });
//     const $ = cheerio.load(data);
//     const badges = [];

//     $('.ql-title-medium.l-mts').each((_, el) => {
//       const title = $(el).text().trim();
//       if (title) badges.push(title);
//     });

//     return badges;
//   } catch (err) {
//     console.error(`Error scraping ${url}:`, err.message);
//     return [];
//   }
// }

// export async function GET() {
//   const urls = getProfileUrls();
//   const leaderboard = [];

//   for (const url of urls) {
//     const badges = await scrapeBadges(url);
//     const score = TARGET_BADGES.filter(b => badges.includes(b)).length;

//     leaderboard.push({ url, score, badges });
//   }

//   leaderboard.sort((a, b) => b.score - a.score);
//   return Response.json({ leaderboard });
// }



import axios from "axios";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic"; // always run on server

// ⚙️ Config
const MAX_CONCURRENT = 20; // how many profiles to scrape at once
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const TARGET_BADGES = [
  "Level 3: Generative AI",
  "The Basics of Google Cloud Compute",
  "Develop Gen AI Apps with Gemini and Streamlit",
  "Prompt Design in Vertex AI",
  "Analyze Speech and Language with Google APIs",
  "Monitoring in Google Cloud",
  "Cloud Speech API: 3 Ways",
  "App Engine: 3 Ways",
  "Cloud Run Functions: 3 Ways",
  "Store, Process, and Manage Data on Google Cloud - Console",
  "Develop with Apps Script and AppSheet",
  "Set Up a Google Cloud Network",
  "Build a Website on Google Cloud",
  "App Building with AppSheet",
  "Get Started with Google Workspace Tools",
  "Get Started with Dataplex",
  "Get Started with Looker",
  "Get Started with API Gateway",
  "Get Started with Pub/Sub",
  "Get Started with Cloud Storage",
];

// 🧠 In-memory cache
let cache = null;

// 🔍 Load profile URLs from environment
function getProfileUrls() {
  return Object.entries(process.env)
    .filter(([key]) => key.startsWith("PROFILE_"))
    .map(([_, value]) => value)
    .filter(Boolean);
}

// 🕵️ Scrape a single profile
async function scrapeProfile(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const $ = cheerio.load(data);

    const name =
      $(".ql-display-small").first().text().trim() || "Unnamed Profile";

    const badges = [];
    $(".ql-title-medium.l-mts").each((_, el) => {
      const title = $(el).text().trim();
      if (title) badges.push(title);
    });

    const score = TARGET_BADGES.filter((b) => badges.includes(b)).length;

    return { url, name, score, badges };
  } catch (err) {
    console.error(`❌ Error scraping ${url}:`, err.message);
    return { url, name: "Error", score: 0, badges: [] };
  }
}

// ⚡ Batch scrape profiles with limited concurrency
async function batchScrape(urls) {
  const results = [];
  for (let i = 0; i < urls.length; i += MAX_CONCURRENT) {
    const batch = urls.slice(i, i + MAX_CONCURRENT);
    const batchResults = await Promise.all(batch.map((url) => scrapeProfile(url)));
    results.push(...batchResults);
  }
  return results;
}

// 🚀 Main API route
export async function GET() {
  // ✅ Use cache if valid
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log("🟢 Serving leaderboard from cache");
    return Response.json({ leaderboard: cache.data });
  }

  const urls = getProfileUrls();
  if (!urls.length)
    return Response.json({ error: "No profile URLs found in .env" }, { status: 400 });

  console.log(`Scraping ${urls.length} profiles...`);

  const leaderboard = await batchScrape(urls);

  leaderboard.sort((a, b) => b.score - a.score);

  // 🧠 Save in cache
  cache = {
    timestamp: Date.now(),
    data: leaderboard,
  };

  console.log("✅ Leaderboard updated");
  return Response.json({ leaderboard });
}
