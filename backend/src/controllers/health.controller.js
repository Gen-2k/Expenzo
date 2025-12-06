export  const healthCheck = (req, res) => {
  res.status(200).json({ satus: "OK",
    message: "Server is running",
    timestamp: new Date()
   });
};