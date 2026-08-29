function notFound(req, res) {
  res.status(404).json({ error: 'Not found' });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid id' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Already exists' });
  }
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
}

module.exports = { notFound, errorHandler };
