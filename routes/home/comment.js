module.exports = (req, res) => {
  const { uid, aid, content } = req.body
  res.send(req.body)
}