import { SceneDef } from "../../lib/timing";

export const VIDEO1_TITLE = "Welcome. How faceless YouTube actually makes money";

/**
 * Video 1 scenes. Edit `vo` freely: durations, captions and visual cues all
 * re-time from this text (or from public/audio/video1/<id>.mp3 once it exists).
 * Visual cues reference exact phrases in `vo`; if you reword a cue phrase, the
 * render will tell you which cue to update in Video1.tsx.
 */
export const video1Scenes: SceneDef[] = [
  {
    id: "v1-01-cold-open",
    title: "Cold open",
    dark: true,
    vo: "No face. No camera. Just a system. Welcome to faceless. In this course, I'm going to show you how to build a YouTube channel that grows toward two thousand dollars a month, without ever showing your face. Short clips for growth. Longer videos for the real money. And one simple daily routine that ties it all together. No fancy gear, no big following, no showing up on camera. Just a laptop, two tools, and a plan. Let's get into it.",
  },
  {
    id: "v1-02-what-faceless",
    title: "What faceless means",
    vo: "So, what does faceless actually mean? It means the content is the star, not you. There are three big types of faceless channels. First, clip channels. You take the best moments from long streams, podcasts or videos, and turn them into short, punchy clips. Second, gameplay channels. You record your own gameplay and post the funniest, wildest or most useful moments. Third, story videos, like Roblox story channels, where gameplay visuals carry a story with a voiceover. Scroll any Shorts feed for ten seconds and you'll see all three. Nobody knows who's behind those channels, and nobody needs to. That's the whole idea. You're building a channel, not a personal brand, so you can stay completely private and still grow.",
  },
  {
    id: "v1-03-misconception",
    title: "The big misconception",
    vo: "Now, the biggest misconception beginners have. They think YouTube pays them for Shorts views. Here's the truth. Shorts ad pay is very low, roughly seven cents to twenty cents per one thousand views. So a million Shorts views might only pay you somewhere around seventy to two hundred dollars. And the rules are getting stricter. From February first, 2027, to keep earning Shorts ad revenue, a channel needs ten million qualified Shorts views in the last ninety days, and YouTube checks that every month. New channels joining the YouTube Partner Program need one thousand subscribers, plus either eight thousand watch hours in twelve months, or twenty million Shorts views in ninety days. So if Shorts views alone don't pay the bills, what does?",
  },
  {
    id: "v1-04-model",
    title: "The YouTube-first model",
    vo: "This is the model we use in this course. It's YouTube first, and it has three parts. Part one: Shorts are for growth. They get discovered fast, and they bring new people to your channel every single day. Part two: long-form videos are for money. That's where the real ad revenue lives. Part three: Whop clipping campaigns are bonus cash while your channel grows. You get paid per view on clips you're already making. And TikTok and Instagram? Same clips, posted again, for extra reach. You make a clip once, and it works for you in four places. That's the core of this whole course. One piece of work, four chances to get seen.",
  },
  {
    id: "v1-05-why-longform",
    title: "Why long-form",
    vo: "Let's talk about why long-form matters so much. Reason one: watch hours. Long-form watch hours are what get a channel monetized. Reason two: long-form videos pay far more per view than Shorts. Not a little more. A lot more. So here's how the pieces connect. Your Shorts get discovered by new people. Some of those people subscribe. Your subscribers then watch your longer videos. Those longer videos build watch hours and earn real ad money. Think of it like a house. Shorts are the front door. They get people inside. Long-form is the living room, where people sit down and stay for a while. And that's where the money is. That's why, in this course, we never stop at Shorts.",
  },
  {
    id: "v1-06-whop",
    title: "Whop: the bonus",
    vo: "While all of that is building, Whop can pay you right now. Here's how it works. A creator or a brand funds a campaign on Whop, under Content Rewards. You clip their content, post it on your channels, and submit the link. Then you get paid for every one thousand approved views. Most campaigns pay around one to five dollars per thousand views, and the median is about a dollar and nine cents. Whop takes about ten percent. Now, two things to watch. Every campaign has a max payout per clip, and a total budget. When the budget runs out, your clips stop earning, even if they keep getting views. So always read the campaign terms before you start.",
  },
  {
    id: "v1-07-math",
    title: "The $2K math",
    dark: true,
    vo: "Let's do the math, honestly. Say you only used Whop. After fees, you'd make about ninety eight cents per one thousand views. To hit two thousand dollars a month, you'd need about two million approved views a month. That's about sixty eight thousand views, every single day. That's a big number, and it's exactly why we stack long-form YouTube on top. Now, I need to be really clear. Results vary a lot. Your first month is about learning, not earning. These are example numbers to show how the math works. They're not a promise. But once you understand the math, you'll know exactly what to aim for, and you can measure your progress every week.",
  },
  {
    id: "v1-08-two-paths",
    title: "Two paths",
    vo: "There are two paths you can take in this course. Path A is clipping. You take long videos, from Whop campaigns or your own gameplay, and turn them into short clips. It's fast to start, and it pairs perfectly with Whop. Path B is Roblox story channels. You make original story videos with gameplay visuals and a voiceover. It's slower to start, but it's fully yours, and it works great for long-form. You can start with one and add the other later. Pick the one that sounds more fun to you, because fun is what keeps you posting. And posting every day is what actually grows a channel. Both paths use the same daily routine, so nothing you learn is wasted.",
  },
  {
    id: "v1-09-risk",
    title: "The risk ladder",
    vo: "Before you clip anything, you need to know the risk ladder. Low risk: your own gameplay, Whop campaigns, and original story videos. Medium risk: creators who publicly allow clipping of their content. High risk: big creators who never gave you permission. With those, Content ID claims send the money to them, not you. You can also get copyright strikes, and three strikes deletes your channel. One more thing. YouTube's inauthentic content policy targets mass produced, repetitive, low effort videos. And reused content means posting other people's content with no meaningful changes. So always add your own touch. Stay low on the ladder, and build something that lasts.",
  },
  {
    id: "v1-10-gta6",
    title: "GTA 6 drops November 19",
    dark: true,
    vo: "Now, let's talk about timing. GTA 6 releases on November nineteenth, 2026, on PS5 and Xbox Series X and S. This is one of the biggest game launches ever, and millions of people will be searching for clips from day one. If you record your own gameplay, you'll have fresh, original content that almost nobody has yet. The channels that post on day one ride the wave. Just remember one rule: no graphic violence in the first seven seconds of a video, or in the thumbnail, or your ads get limited. A good clip on day one beats a perfect clip on day ten. So get set up now, and be ready the moment it drops.",
  },
  {
    id: "v1-11-course-order",
    title: "How to go through the course",
    vo: "Here's how to go through this course. First, the Start Here page. Then read PDF one. Then PDF two. Then watch video two, where we make your first clip together. Then read PDFs three and four. Then watch video three, the daily routine. And finally, the Playbook. Do them in this order. Each step builds on the one before it, so don't skip ahead. The PDFs give you the details and the checklists. The videos show you how it all fits together. If you ever feel lost, come back to this list and pick up where you left off.",
  },
  {
    id: "v1-12-one-rule",
    title: "The one rule",
    dark: true,
    holdSeconds: 4,
    vo: "And if you remember one thing from this video, remember this. Post every day. For thirty days. Before you judge anything. Not ten days. Not two weeks. Thirty days. Most people quit right before it starts working. They post for a week, see small numbers, and stop. Early numbers are supposed to be small. That's normal. Every clip teaches you something, and those lessons stack up fast. So stick with it. You won't quit. I'll see you in the next video, where we make your first clip together.",
  },
];
