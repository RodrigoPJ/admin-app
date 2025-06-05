import app from './app';
import { connectDB } from './database/dbconfig';

const port = parseInt(process.env['PORT'] as string) || 3000;

app.listen(3000, async () => {
  console.log(`Server running on port ${port}`);
  await connectDB();
});