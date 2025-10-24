export const config = {
  associationName: "انجمن علمی اقتصاد",
  associationLogo: "/images/logo.png",
  themeColor: "#005a9c",
  dataFileName: "economics.json",
  
  // --- این خط باید حتما https داشته باشد ---
  baseUrl: "https://scu-econ-profiles.pages.dev", // <--- آدرس دامنه Cloudflare Pages شما

  // آرایه‌ای از امتیازات لازم برای رسیدن به هر سطح
  levelThresholds: [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5000]
};