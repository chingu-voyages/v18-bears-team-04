import app from "./app";
import mongoManager from "../mongo";

const PORT = process.env.PORT || 3000;

mongoManager();

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
