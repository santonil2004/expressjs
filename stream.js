const express = require('express');
const fs = require('fs');
const path = require('path');
const rangeParser = require('range-parser');

const app = express();
const port = 3000;

app.get('/', (req, res)=> {
    res.send(`<video width="640" height="360" controls>
    <source src="http://localhost:3000/video" type="video/mp4">
    Your browser does not support the video tag.
  </video>`);
})

app.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, 'sample.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range || 'bytes=0-';

  const ranges = rangeParser(fileSize, range, { combine: true });

  if (!ranges || ranges === -1) {
    // Invalid range or no range provided
    return res.status(416).send('Range Not Satisfiable');
  }

  const start = ranges[0].start;
  const end = ranges[0].end;

  const chunksize = (end - start) + 1;

  const fileStream = fs.createReadStream(videoPath, { start, end });
  const head = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, head);
  fileStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
