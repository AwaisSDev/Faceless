// Exports each video's voiceover script to scripts/videoN.md, split by scene id,
// so each scene can be pasted into ElevenLabs as its own file.
// Run: npm run scripts
import fs from "fs";
import path from "path";

const videos = [
  { n: 1, file: "src/videos/video1/scenes.ts" },
  { n: 2, file: "src/videos/video2/scenes.ts" },
  { n: 3, file: "src/videos/video3/scenes.ts" },
];

for (const v of videos) {
  if (!fs.existsSync(v.file)) continue;
  const src = fs.readFileSync(v.file, "utf8");
  const title = (/_TITLE = "([^"]+)"/.exec(src) || [])[1] || `Video ${v.n}`;
  const re = /id: "([^"]+)",\s*title: "([^"]+)",([\s\S]*?)vo: "((?:[^"\\]|\\.)*)"/g;
  let m;
  let total = 0;
  const parts = [];
  while ((m = re.exec(src))) {
    const [, id, sceneTitle, meta, vo] = m;
    const text = vo.replace(/\\"/g, '"').replace(/\\'/g, "'");
    const words = text.trim().split(/\s+/).length;
    total += words;
    const slot = /slot: true/.test(meta);
    parts.push(
      `## ${id}\n\n**${sceneTitle}** · ${words} words · about ${Math.round((words / 150) * 60)} s${slot ? " · optional screen-recording slot" : ""}\n\nSave the ElevenLabs file as: \`public/audio/video${v.n}/${id}.mp3\`\n\n\`\`\`text\n${text}\n\`\`\`\n`,
    );
  }
  const md = `# Video ${v.n}: ${title}\n\nVoiceover script, split by scene. ${total} words, about ${(total / 150).toFixed(1)} minutes at 150 words per minute.\n\nPaste each scene into ElevenLabs as its own generation and save it with the exact file name shown. The video re-times itself to the real audio automatically (see README.md).\n\n${parts.join("\n")}`;
  fs.writeFileSync(path.join("scripts", `video${v.n}.md`), md);
  console.log(`scripts/video${v.n}.md: ${parts.length} scenes, ${total} words`);
}
