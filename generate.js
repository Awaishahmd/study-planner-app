export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { topics } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // ✅ Updated model
        messages: [
          {
            role: "system",
            content: "You are a helpful AI tutor that generates personalized study plans based on weak topics.",
          },
          {
            role: "user",
            content: `Create a focused study plan to master these topics: ${topics}`,
          },
        ],
      }),
    });

    const data = await response.json();

    // Debugging
    console.log("Full API response:", data);

    const output = data.choices?.[0]?.message?.content || "No response from AI";

    res.status(200).json({ plan: output });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
