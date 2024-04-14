import axios from "axios";

export default async function handler(req, res) {
  // Only allow POST method for this endpoint
  if (req.method === "POST") {
    try {
      const { message } = req.body;

      const openaiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Replace with the model you want to use
          messages: [{ role: "user", content: message }]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      // Respond with the message from the OpenAI API
      res.status(200).json(openaiResponse.data);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      res
        .status(500)
        .json({ message: "Error calling OpenAI API", error: error.message });
    }
  } else {
    // If method is not POST, return 405 Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
