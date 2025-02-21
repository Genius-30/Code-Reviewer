import generateReview from "../services/ai.service.js";

const getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ message: "Code is required!" });
  }

  const response = await generateReview(code);

  res.status(200).json({ response });
};

export default getReview;
