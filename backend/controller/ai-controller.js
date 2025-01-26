const axios = require('axios');

exports.generateContent = async (req, res) => {
  const { topic } = req.body;

  // Check if topic is provided
  if (!topic) {
    return res.status(400).json({ message: 'Topic is required' });
  }

  try {
    // Send request to Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC4Xz-Suszz_y_6Su0fzAK5LtRpJ1TFg2o`,
      {
        contents: [
          {
            parts: [
              {
                text: `Write a detailed blog about ${topic}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract content from API response
    const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated';

    res.status(200).json({ content: generatedContent });
  } catch (error) {
    console.error('Error generating content:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Failed to generate content',
      error: error.response?.data?.error?.message || error.message,
    });
  }
};

