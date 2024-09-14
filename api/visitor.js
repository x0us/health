const kvApiUrl = process.env.KV_REST_API_URL;
const kvApiToken = process.env.KV_REST_API_TOKEN;
const VISITOR_COUNT_KEY = "visitor_count"; // KV 中存储的 key

// 获取当前访问者计数
async function getVisitorCount() {
  console.log("KV API URL:", kvApiUrl); // 调试输出
  const response = await fetch(`${kvApiUrl}/get/${VISITOR_COUNT_KEY}`, {
    headers: {
      Authorization: `Bearer ${kvApiToken}`,
    },
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2)); 
  return parseInt(data.result || 0, 10); // 如果没有计数则返回 0
}

// 增加访问者计数
async function incrementVisitorCount(currentCount) {
  const newCount = currentCount + 1;

  await fetch(`${kvApiUrl}/set/${VISITOR_COUNT_KEY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvApiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: newCount }),
  });

  return newCount;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const currentCount = await getVisitorCount();
  
      const newCount = await incrementVisitorCount(currentCount);

      res.status(200).json({ count: newCount });
    } catch (error) {
      console.error("Error interacting with KV:", error);
      res.status(500).json({ error: "Failed to update visitor count" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
