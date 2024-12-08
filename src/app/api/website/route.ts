import puppeteer from "puppeteer"

export async function POST(request: Request) {
    try {
        const query:string  = await request.json();
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = browser.newPage();
    (await page).setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us&num=20`;
    await (await page).goto(searchUrl, { waitUntil: "networkidle2" });

    const results = await (await page).evaluate(() => {
      const elements = document.querySelectorAll(".tF2Cxc");
      return Array.from(elements).map((el) => {
        const title = el.querySelector("h3")?.innerText || "No title";
        const link = el.querySelector("a")?.href || "No link";
        const description = el.querySelector(".IsZvec");
        return { title, link, description };
      });
    });
    await browser.close();

    //FILTERING OUT THE BLOG WEBSITE FROM THE WEB SCRAPPING
    const blogKeywords = ["blog", "wordpress", "medium", "tumblr", "blogger"];
    const filteredResults = results.filter((result) => {
      return !blogKeywords.some((keyword) => result.link.includes(keyword));
    });

    return Response.json({ filteredResults });
    } catch (error) {
        console.error(error);

        return Response.json({ message: "Internal server error" });   
    }
}