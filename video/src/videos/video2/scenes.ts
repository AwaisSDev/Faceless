import { SceneDef } from "../../lib/timing";

export const VIDEO2_TITLE = "Make your first clip: the OpusClip + CapCut system";

/**
 * Optional "SCREEN RECORDING" placeholder slots. Set any of these to false to
 * remove that slot from the video; timing re-flows automatically.
 */
export const SLOTS = {
  whopCampaign: true,
  opusclipRun: true,
  capcutEdit: true,
};

const allScenes: (SceneDef & { slotKey?: keyof typeof SLOTS; slotText?: string })[] = [
  {
    id: "v2-01-cold-open",
    title: "Cold open",
    dark: true,
    vo: "One long video in. Ten clips out. That's what we're building today. By the end of this video, you'll know exactly how to turn a long stream, a podcast or a gameplay session into short clips that are ready to post, and that actually feel like yours. Two tools. One simple system. Let's make your first clip.",
  },
  {
    id: "v2-02-two-tools",
    title: "Two tools, one job each",
    vo: "Here's the whole system in one picture. You use two tools, and each one has exactly one job. OpusClip is the AI clipper. Its job is to find the best moments in a long video and cut them out for you. CapCut is the editor. Its job is to make each clip yours, with your hook, your captions and your edits. So the flow goes like this. Long video in. The AI clipper finds the moments. The editor makes them yours. You post. And you get paid. Keep this picture in your head, because every step today fits into it. The AI saves you hours of scrubbing. The editing is what gets you paid. Most beginners skip the second tool, and that's exactly why their clips go nowhere.",
  },
  {
    id: "v2-03-source",
    title: "Getting the source video",
    vo: "Step one is getting your source video. And here's the rule: pick a campaign first, not a creator. On Whop, open Content Rewards and browse the campaigns. Each one shows you the rate per one thousand views, the max payout per clip, and how much budget is left. Pick one that still has budget, with a creator you actually understand, then grab the footage they allow. The other option is even safer: record your own GTA 6 gameplay. It's original, it's yours, and it sits at the very bottom of the risk ladder. Either way, you know you're allowed to use it before you spend a single minute editing.",
  },
  {
    id: "v2-slot-whop",
    title: "Optional screen recording: browsing Whop campaigns",
    vo: "",
    slot: true,
    minSeconds: 15,
    slotKey: "whopCampaign",
    slotText: "Browsing Whop Content Rewards and opening one campaign (rate, max payout, budget)",
  },
  {
    id: "v2-04-credits",
    title: "Credits explained",
    vo: "Before you upload anything, you need to understand credits. In OpusClip, one credit equals one minute of uploaded video. So a three hour stream would cost you one hundred and eighty credits. That's more than a whole month on the Starter plan. The fix is simple. Trim first. Scrub through the stream, find the best thirty to sixty minutes, and only upload that part. Now that same stream costs you around forty five credits instead of one hundred and eighty. Same best moments, about a quarter of the cost. Always trim before you upload. A quick tip: watch the stream at double speed, and drop a marker every time something big happens. Then upload the section with the most markers.",
  },
  {
    id: "v2-05-opusclip",
    title: "AI clipper step by step",
    vo: "Now let's run it through OpusClip. First, paste your video link, or upload your trimmed file. Next, set the clip length. For Shorts, twenty to forty five seconds is the sweet spot. Then set the aspect ratio to nine by sixteen, so the clips come out vertical. Hit get clips, and let it process. In a few minutes, you'll get a list of clips, each with a virality score. Now here's the important part. The score is a hint, not a decision. It tells you what the AI thinks might work. You still watch every single clip, and you decide.",
  },
  {
    id: "v2-slot-opusclip",
    title: "Optional screen recording: running OpusClip",
    vo: "",
    slot: true,
    minSeconds: 15,
    slotKey: "opusclipRun",
    slotText: "Pasting a link in OpusClip, setting 20 to 45 seconds and 9:16, and the results list",
  },
  {
    id: "v2-06-checklist",
    title: "The worth posting checklist",
    vo: "So how do you decide? Use the worth posting checklist. One: something happens in the first two seconds. No slow intros. Two: it makes sense with no context. A stranger scrolling past should get it instantly. Three: it has a clear payoff, like a punchline, a reaction, or a twist. Four: it's twenty to forty five seconds long. Five: you can say the hook in one line. And six: it's safe on the risk ladder. If a clip fails even one of these, skip it. There's always another one. Posting three great clips beats posting ten average ones, every single time.",
  },
  {
    id: "v2-07-never-raw",
    title: "Never post AI output raw",
    dark: true,
    vo: "Now, the biggest mistake new clippers make. They download the AI clips and post them raw. Here's the problem. Everyone in a campaign uploads the same video into the same tool, so everyone gets the same AI picks. Imagine fifty clippers posting fifty identical clips. Nobody stands out, and the platforms notice. And remember YouTube's inauthentic content policy. It targets mass produced, repetitive, low effort videos. Raw AI clips are exactly that. So never post them raw. Always make them yours. That's what CapCut is for.",
  },
  {
    id: "v2-08-editor",
    title: "Editor step by step",
    vo: "Here's the editing routine in CapCut, step by step. First, tighten the start. Cut everything before the action, so something happens in the first two seconds. Second, add your hook text near the top. One short line that makes people stay. Third, restyle the captions. Keep them big and readable, and keep them in the safe zone, away from the bottom and the right edge, where the app buttons sit. Fourth, add one edit, like a punch in zoom on the big moment. Fifth, if you can, add three to ten seconds of your own voice. Sixth, end right on the payoff. And finally, export at ten eighty by nineteen twenty.",
  },
  {
    id: "v2-slot-capcut",
    title: "Optional screen recording: editing in CapCut",
    vo: "",
    slot: true,
    minSeconds: 18,
    slotKey: "capcutEdit",
    slotText: "Editing one clip in CapCut: trim the start, hook text, caption style, punch-in zoom, export",
  },
  {
    id: "v2-09-before-after",
    title: "Before vs after",
    vo: "Now look at the difference. On the left, the raw AI clip. A slow start, default captions, no hook, and the same as fifty other people. On the right, the finished clip. It starts on the action, it has a hook at the top, captions you styled yourself, a zoom on the big moment, and your own voice. Same footage. A completely different clip. This is what makes it yours, and this is what gets watched. People can feel the difference in the first second, even if they can't explain it. Your edit is your signature, and over time, viewers start to recognize it.",
  },
  {
    id: "v2-10-hooks",
    title: "Hook formulas",
    vo: "Your hook is the most important line in the whole clip. Here are some formulas that work. Wait for his reaction. Nobody expected this. Did you notice this? GTA 5 versus GTA 6 cops. POV: you just bought GTA 6 on day one. He wasn't supposed to do that. This is the best moment of the stream. Watch until the end. Don't copy these word for word. Use them as starting points, and make each one fit your clip. A good hook is short, it creates a question, and the clip answers it. If your hook promises something, the clip has to deliver, or people swipe away and don't come back.",
  },
  {
    id: "v2-11-plans",
    title: "OpusClip plans",
    vo: "Let's talk about OpusClip plans. There's a free trial, and you don't need a card to start it. Starter is about twelve to fifteen dollars a month, for one hundred and fifty credits. Pro is about twenty three to twenty nine dollars a month, for three hundred credits, with rollover, six social accounts and a scheduler. Here's my rule: only upgrade when your earnings cover it. Start on the trial, then Starter. Move to Pro when you keep running out of credits and the money is already coming in. Tools should pay for themselves. Never spend money hoping it will make you money.",
  },
  {
    id: "v2-12-homework",
    title: "Homework and outro",
    dark: true,
    holdSeconds: 4,
    vo: "Here's your homework. Make three clips today. Pick a campaign or record your own gameplay, run it through OpusClip, check every clip against the checklist, and edit your best three in CapCut. And time yourself. Your first clip will probably take around twenty minutes. That's completely normal. By clip thirty, you'll be doing it in under ten. Speed comes from reps, not talent. Every clip you make teaches your hands where everything is. So don't worry about being slow today. Just finish all three, post them, and start your tracking sheet. In the next video, we'll turn all of this into a daily routine. See you there.",
  },
];

export const video2Scenes: SceneDef[] = allScenes.filter((s) => !s.slotKey || SLOTS[s.slotKey]);

/** Text shown on each screen-recording placeholder card. */
export const SLOT_TEXT: Record<string, string> = Object.fromEntries(
  allScenes.filter((s) => s.slotKey).map((s) => [s.id, s.slotText ?? ""]),
);
