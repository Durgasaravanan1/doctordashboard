

import { useState, useRef, useEffect } from "react";
import {
  FiUpload,
  FiCalendar,
  FiCopy,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiImage,
  FiVideo,
  FiFileText,
  FiType,
  FiSmile,
  FiTarget,
  FiSend,
  FiBarChart2,
  FiZap,
  FiCheck,
  FiTrash2,
  FiPlay,
  FiLink,
  FiDownload,
  FiX,
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaRegSmile,
  FaRegSmileBeam,
  FaSmileBeam,
  FaRegLaughBeam,
  FaHashtag,
  FaRocket,
  FaMagic,
  FaFileVideo,
  FaCheck as FaCheckSolid,
} from "react-icons/fa";

/**
 * Autopost.jsx
 * Theme updated to match your Dashboard/Billing pages:
 * - Page bg: #FEFCE8
 * - Accent cyan: #00B8DB
 * - Accent yellow: #F0B100
 * - Success green: #00C950
 * - Border black: #0D0D0D (used mostly as border)
 *
 * NOTE: Removed all "gradient" look. Uses white cards + bold borders like Dashboard/Billing.
 */

const THEME = {
  pageBg: "#FEFCE8",
  cyan: "#00B8DB",
  yellow: "#F0B100",
  green: "#00C950",
  red: "#FF2D2D",
  black: "#0D0D0D",
};

export default function Autopost() {
  const [platform, setPlatform] = useState("LinkedIn");
  const [postType, setPostType] = useState("text");
  const [emojiIntensity, setEmojiIntensity] = useState("Balanced");
  const [audience, setAudience] = useState("General");
  const [contentIdea, setContentIdea] = useState("");
  const [videoDuration, setVideoDuration] = useState(30);
  const [generatedPost, setGeneratedPost] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [posting, setPosting] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [showOptimization, setShowOptimization] = useState(true);
  const [isUploadOptional, setIsUploadOptional] = useState(true);

  // Link toggle per platform
  const [linkedPlatforms, setLinkedPlatforms] = useState({
    LinkedIn: true,
    X: false,
    Instagram: false,
    Facebook: false,
    TikTok: false,
    YouTube: false,
  });

  const [popupOpen, setPopupOpen] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const fileInputRef = useRef(null);
  const contentRef = useRef(null);

  const platforms = [
    { name: "LinkedIn", icon: <FaLinkedinIn className="text-lg" /> },
    { name: "X", icon: <FaTwitter className="text-lg" /> },
    { name: "Instagram", icon: <FaInstagram className="text-lg" /> },
    { name: "Facebook", icon: <FaFacebookF className="text-lg" /> },
    { name: "TikTok", icon: <FaTiktok className="text-lg" /> },
    { name: "YouTube", icon: <FaYoutube className="text-lg" /> },
  ];

  const emojiLevels = [
    { name: "None", icon: <FaRegSmile />, emojis: "" },
    { name: "Minimal", icon: <FaRegSmileBeam />, emojis: "✨" },
    { name: "Balanced", icon: <FaSmileBeam />, emojis: "✨🚀" },
    { name: "High", icon: <FaRegLaughBeam />, emojis: "🔥🚀✨" },
  ];

  const audiences = [
    { name: "Founders", icon: "👨‍💼" },
    { name: "Marketers", icon: "📈" },
    { name: "Job Seekers", icon: "💼" },
    { name: "General", icon: "👥" },
  ];

  const hashtags = ["#Entrepreneurship", "#StartupLife", "#Business", "#Leadership", "#Growth"];

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setScheduleDate(tomorrow.toISOString().split("T")[0]);
    setScheduleTime("09:00");

    setContentIdea("How to build an engaged community on social media through authentic content");

    setTimeout(() => {
      buildPost();
    }, 120);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isReady =
    platform &&
    postType &&
    contentIdea.trim() &&
    audience &&
    emojiIntensity &&
    (postType !== "video" || videoDuration);

  const buildPost = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const emojis = emojiLevels.find((level) => level.name === emojiIntensity)?.emojis || "";
      let post = "";

      // Media info
      if (uploadedMedia.length > 0) {
        const images = uploadedMedia.filter((m) => m.type.startsWith("image"));
        const videos = uploadedMedia.filter((m) => m.type.startsWith("video"));

        if (images.length > 0) post += `📸 Images Attached: ${images.length}\n\n`;
        if (videos.length > 0) post += `🎥 Videos Attached: ${videos.length}\n\n`;
      }

      if (postType === "text") {
        post += `Here's what I've learned:\n\n→ ${contentIdea}\n→ Focus on solving real problems\n→ Consistency beats perfection\n\nThe secret? Invisible work compounds.\n\n${emojis}`;
      } else if (postType === "video") {
        post += `🎥 Video Script (${videoDuration}s)\n\nHook: Ever faced this?\n\n${contentIdea}\n\nCTA: Follow for more!\n\n${emojis}`;
      } else if (postType === "image") {
        post += `🖼 Poster Caption:\n\n${contentIdea}\n\n${emojis}`;
      } else if (postType === "article") {
        post += `📖 Article Outline\n\n${contentIdea}\n\n1. Problem\n2. Experience\n3. Lessons\n4. Takeaway\n\n${emojis}`;
      }

      if (uploadedMedia.length > 0) {
        post += `\n\n📎 Media included:`;
        uploadedMedia.forEach((media, index) => {
          if (media.type.startsWith("image")) post += `\n   • Image ${index + 1}: ${media.name}`;
          if (media.type.startsWith("video")) post += `\n   • Video ${index + 1}: ${media.name}`;
        });
      }

      post += `\n\n#${platform.replace(/\s+/g, "")} #SocialMedia #ContentCreation`;

      setGeneratedPost(post);
      setIsGenerating(false);
    }, 600);
  };

  const copyPost = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const mediaFiles = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setUploadedMedia((prev) => [...prev, ...mediaFiles]);
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(uploadedMedia[index].url);
    setUploadedMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const applyImprovement = (type) => {
    const upgrades = {
      personal: "\n\nPersonal takeaway: This completely changed how I work.",
      bold: "\n\nThis is the harsh truth nobody talks about.",
      shorten: generatedPost.split("\n").slice(0, 5).join("\n"),
      story: "\n\nQuick story: I failed before getting it right.",
      stats: "\n\n📊 80% quit before results show.",
      emojis: generatedPost + " 🚀🔥✨",
    };
    setGeneratedPost(upgrades[type] || generatedPost);
  };

  const addCTA = (type) => {
    const ctas = {
      question: "\n\nWhat's your experience with this?",
      soft: "\n\nFollow for more insights.",
      strong: "\n\nComment YES if you agree 👇",
    };
    setGeneratedPost(generatedPost + ctas[type]);
  };

  const addHashtag = (tag) => {
    if (!generatedPost.includes(tag)) setGeneratedPost(generatedPost + "\n" + tag);
  };

  const handlePostNow = () => {
    setPosting(true);
    setTimeout(() => {
      alert(`✅ Post published successfully on ${platform}!`);
      setPopupOpen(null);
      setPosting(false);
    }, 1200);
  };

  const handleSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      alert("Please select both date and time");
      return;
    }
    setScheduling(true);
    setTimeout(() => {
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      alert(`📅 Post scheduled for ${scheduledDateTime.toLocaleString()} on ${platform}!`);
      setPopupOpen(null);
      setScheduling(false);
    }, 1200);
  };

  const toggleLink = (platformName) => {
    setLinkedPlatforms((prev) => ({
      ...prev,
      [platformName]: !prev[platformName],
    }));
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case "text":
        return <FiType className="text-lg" />;
      case "video":
        return <FiVideo className="text-lg" />;
      case "image":
        return <FiImage className="text-lg" />;
      case "article":
        return <FiFileText className="text-lg" />;
      default:
        return <FiFileText className="text-lg" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Auto-generate post when relevant fields change
  useEffect(() => {
    if (!contentIdea.trim()) return;
    const timer = setTimeout(() => buildPost(), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, postType, emojiIntensity, audience, contentIdea, linkedPlatforms, videoDuration, uploadedMedia.length]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: THEME.pageBg,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 py-7">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">
              SOCIAL MEDIA POST ASSISTANT
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Create engaging social media content in seconds
            </p>
          </div>

          <button
            type="button"
            onClick={buildPost}
            className="h-9 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm inline-flex items-center gap-2"
          >
            <FiRefreshCw className={isGenerating ? "animate-spin" : ""} />
            REGENERATE
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Platform */}
            <Section title="Select Platform" icon={<FiSend />}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((p) => (
                  <div key={p.name} className="relative">
                    <button
                      onClick={() => toggleLink(p.name)}
                      className="absolute -top-2 -right-2 bg-white border-2 border-black rounded-full p-1 shadow-sm z-10 hover:opacity-90 transition"
                      title={linkedPlatforms[p.name] ? "Link enabled" : "Link disabled"}
                    >
                      {linkedPlatforms[p.name] ? (
                        <FaCheckSolid className="text-[#00C950]" size={14} />
                      ) : (
                        <FiLink className="text-black/60" size={14} />
                      )}
                    </button>

                    <CardSelect
                      active={platform === p.name}
                      onClick={() => setPlatform(p.name)}
                      className="flex flex-col items-center p-4"
                    >
                      <div
                        className={`p-3 rounded-md border-2 border-black ${
                          platform === p.name ? "bg-[#00B8DB]" : "bg-white"
                        }`}
                      >
                        <span className={`${platform === p.name ? "text-black" : "text-black"}`}>
                          {p.icon}
                        </span>
                      </div>
                      <span className="mt-2 font-extrabold text-xs tracking-wide">{p.name}</span>
                    </CardSelect>
                  </div>
                ))}
              </div>
            </Section>

            {/* Post Type */}
            <Section title="Post Type" icon={<FiType />}>
              <div className="grid grid-cols-2 gap-3">
                {["text", "video", "image", "article"].map((t) => (
                  <CardSelect
                    key={t}
                    active={postType === t}
                    onClick={() => setPostType(t)}
                    className="flex flex-col items-center p-4"
                  >
                    <div
                      className={`h-10 w-10 border-2 border-black rounded-md flex items-center justify-center ${
                        postType === t ? "bg-[#F0B100]" : "bg-white"
                      }`}
                    >
                      {getPostTypeIcon(t)}
                    </div>
                    <span className="mt-2 font-extrabold text-xs tracking-wide uppercase">
                      {t}
                    </span>
                  </CardSelect>
                ))}
              </div>
            </Section>

            {/* Video Duration */}
            {postType === "video" && (
              <Section title="Video Duration (seconds)" icon={<FiVideo />}>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="15"
                    max="300"
                    step="15"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black/60">Duration:</span>
                    <span className="h-8 px-3 bg-[#00B8DB] border-2 border-black rounded-sm font-extrabold text-xs inline-flex items-center">
                      {videoDuration}s
                    </span>
                  </div>
                </div>
              </Section>
            )}

            {/* Upload */}
            <Section title="Upload Images & Videos (Optional)" icon={<FiUpload />}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-black/60">
                    <input
                      type="checkbox"
                      checked={isUploadOptional}
                      onChange={(e) => setIsUploadOptional(e.target.checked)}
                      className="rounded border-black/30"
                    />
                    Optional Upload
                  </label>
                  <span className="text-xs text-black/45">
                    {uploadedMedia.length} file{uploadedMedia.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-md min-h-28 flex flex-col items-center justify-center transition ${
                    uploadedMedia.length > 0
                      ? "border-[#00C950] bg-white"
                      : "border-black/30 bg-white hover:border-black"
                  }`}
                >
                  <FiUpload
                    className={`text-3xl mb-2 ${
                      uploadedMedia.length > 0 ? "text-[#00C950]" : "text-black/40"
                    }`}
                  />
                  <div className="font-extrabold text-xs text-black">
                    {uploadedMedia.length > 0 ? "ADD MORE FILES" : "CLICK TO UPLOAD"}
                  </div>
                  <div className="text-xs text-black/45 mt-1">PNG, JPG, MP4, MOV</div>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                />

                {uploadedMedia.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {uploadedMedia.map((media, index) => (
                      <div key={index} className="border-2 border-black rounded-md bg-white overflow-hidden">
                        <div className="p-3">
                          <div className="flex items-start gap-2">
                            <div className="h-9 w-9 border-2 border-black rounded-md flex items-center justify-center bg-[#00B8DB]">
                              {media.type.startsWith("image") ? (
                                <FiImage className="text-black" />
                              ) : (
                                <FaFileVideo className="text-black" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-extrabold text-black truncate">{media.name}</p>
                              <p className="text-xs text-black/50 mt-1">{formatFileSize(media.size)}</p>
                            </div>

                            <button
                              onClick={() => removeMedia(index)}
                              className="h-8 w-8 border-2 border-black rounded-sm bg-white flex items-center justify-center"
                              title="Remove"
                            >
                              <FiTrash2 className="text-black" />
                            </button>
                          </div>

                          {media.type.startsWith("image") ? (
                            <div className="mt-3 border-2 border-black rounded-sm overflow-hidden">
                              <img src={media.url} alt="Preview" className="w-full h-24 object-cover" />
                            </div>
                          ) : (
                            <div className="mt-3 border-2 border-black rounded-sm p-3 bg-[#FFFBEE]">
                              <div className="flex items-center gap-2 font-extrabold text-xs text-black">
                                <FiPlay /> VIDEO READY
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Section>

            {/* Content Idea */}
            <Section title="Your Content Idea" icon={<FiZap />}>
              <textarea
                className="w-full h-32 border-2 border-black rounded-md p-4 resize-none outline-none bg-white text-sm"
                value={contentIdea}
                onChange={(e) => setContentIdea(e.target.value)}
                placeholder="Enter your main content idea..."
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-black/50">{contentIdea.length}/500</span>
                <span className="text-xs text-black/50">Be specific and clear</span>
              </div>
            </Section>

            {/* Audience */}
            <Section title="Target Audience" icon={<FiTarget />}>
              <div className="flex flex-wrap gap-2">
                {audiences.map((a) => (
                  <button
                    key={a.name}
                    onClick={() => setAudience(a.name)}
                    className={[
                      "h-10 px-4 rounded-sm border-2 border-black font-extrabold text-xs inline-flex items-center gap-2",
                      audience === a.name ? "bg-[#F0B100] text-black" : "bg-white text-black hover:bg-black/5",
                    ].join(" ")}
                  >
                    <span className="text-base">{a.icon}</span>
                    {a.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </Section>

            {/* Emoji intensity */}
            <Section title="Emoji Intensity" icon={<FiSmile />}>
              <div className="grid grid-cols-4 gap-3">
                {emojiLevels.map((level) => (
                  <button
                    key={level.name}
                    onClick={() => setEmojiIntensity(level.name)}
                    className={[
                      "border-2 border-black rounded-md p-3 flex flex-col items-center gap-2",
                      emojiIntensity === level.name ? "bg-[#00B8DB]" : "bg-white hover:bg-black/5",
                    ].join(" ")}
                    type="button"
                  >
                    <div className="text-xl text-black">{level.icon}</div>
                    <div className="text-[11px] font-extrabold text-black uppercase">{level.name}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Generate */}
            <button
              disabled={!isReady || isGenerating}
              onClick={buildPost}
              className={[
                "w-full h-12 rounded-sm border-2 border-black font-extrabold text-sm inline-flex items-center justify-center gap-2",
                isReady ? "bg-[#00B8DB] text-black" : "bg-white text-black/40 cursor-not-allowed",
              ].join(" ")}
            >
              {isGenerating ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  GENERATING...
                </>
              ) : (
                <>
                  <FaMagic />
                  GENERATE POST
                </>
              )}
            </button>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {/* Generated Content */}
            <div className="border-2 border-black bg-white rounded-md overflow-hidden">
              <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between">
                <div className="font-extrabold text-sm text-black uppercase flex items-center gap-2">
                  <FiZap />
                  Generated Content
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={buildPost}
                    className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
                    title="Regenerate"
                  >
                    <FiRefreshCw className={isGenerating ? "animate-spin" : ""} />
                  </button>
                  <button
                    onClick={copyPost}
                    className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center relative"
                    title="Copy"
                    disabled={!generatedPost}
                  >
                    {copied ? <FiCheck className="text-[#00C950]" /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div
                ref={contentRef}
                className="p-5 h-80 overflow-y-auto whitespace-pre-line bg-white"
                style={{ scrollbarWidth: "thin" }}
              >
                {generatedPost ? (
                  <div className="space-y-4">
                    {uploadedMedia.length > 0 && (
                      <div className="border-2 border-black rounded-md p-3 bg-[#FFFBEE]">
                        <div className="font-extrabold text-xs text-black uppercase flex items-center gap-2">
                          <FiUpload />
                          Media Preview ({uploadedMedia.length})
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          {uploadedMedia.map((media, index) => (
                            <div key={index} className="border-2 border-black rounded-sm overflow-hidden bg-white">
                              {media.type.startsWith("image") ? (
                                <img src={media.url} alt="preview" className="w-full h-28 object-cover" />
                              ) : (
                                <div className="h-28 flex items-center justify-center bg-black/90 text-white">
                                  <FiPlay className="text-3xl" />
                                </div>
                              )}
                              <div className="p-2 text-[11px] font-extrabold text-black truncate">
                                {media.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-black leading-relaxed whitespace-pre-line">
                      {generatedPost}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-black/40">
                    <div className="text-5xl mb-3">📝</div>
                    <div className="font-extrabold text-sm">YOUR GENERATED POST WILL APPEAR HERE</div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {generatedPost && (
              <div className="flex gap-3">
                <button
                  onClick={() => setPopupOpen("post")}
                  disabled={posting}
                  className="flex-1 h-12 border-2 border-black rounded-sm bg-[#00C950] text-black font-extrabold text-sm inline-flex items-center justify-center gap-2"
                >
                  <FaRocket />
                  {posting ? "POSTING..." : "POST NOW"}
                </button>

                <button
                  onClick={() => setPopupOpen("schedule")}
                  disabled={scheduling}
                  className="flex-1 h-12 border-2 border-black rounded-sm bg-[#F0B100] text-black font-extrabold text-sm inline-flex items-center justify-center gap-2"
                >
                  <FiCalendar />
                  {scheduling ? "SCHEDULING..." : "SCHEDULE"}
                </button>
              </div>
            )}

            {/* Improvements */}
            {generatedPost && (
              <div className="border-2 border-black bg-white rounded-md">
                <div className="p-5">
                  <div className="font-extrabold text-sm text-black uppercase flex items-center gap-2">
                    <FiZap />
                    Add Improvements
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip onClick={() => applyImprovement("personal")}>MORE PERSONAL</Chip>
                    <Chip onClick={() => applyImprovement("bold")}>MORE BOLD</Chip>
                    <Chip onClick={() => applyImprovement("shorten")}>SHORTEN</Chip>
                    <Chip onClick={() => applyImprovement("story")}>ADD STORY</Chip>
                    <Chip onClick={() => applyImprovement("stats")}>ADD STATS</Chip>
                    <Chip onClick={() => applyImprovement("emojis")}>MORE EMOJIS</Chip>
                  </div>

                  <div className="mt-6 font-extrabold text-sm text-black uppercase flex items-center gap-2">
                    <FiTarget />
                    Add Call-to-Action
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <CTA onClick={() => addCTA("question")}>ADD QUESTION</CTA>
                    <CTA onClick={() => addCTA("soft")}>ADD SOFT CTA</CTA>
                    <CTA onClick={() => addCTA("strong")}>ADD STRONG CTA</CTA>
                  </div>

                  <div className="mt-6 border-t border-black/10 pt-5">
                    <button
                      onClick={() => setShowOptimization(!showOptimization)}
                      className="w-full flex items-center justify-between"
                      type="button"
                    >
                      <div className="font-extrabold text-sm text-black uppercase flex items-center gap-2">
                        <FiBarChart2 />
                        Optimization Insights
                      </div>
                      {showOptimization ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {showOptimization && (
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <Score title="READABILITY" value="92/100" variant="green" />
                          <Score title="ENGAGEMENT" value="87/100" variant="cyan" />
                        </div>

                        <div>
                          <div className="font-extrabold text-xs text-black uppercase flex items-center gap-2">
                            <FaHashtag />
                            Suggested Hashtags
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {hashtags.map((tag) => (
                              <Chip key={tag} onClick={() => addHashtag(tag)}>
                                {tag.toUpperCase()}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Export helper */}
            {generatedPost && (
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([generatedPost], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "generated-post.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="h-11 w-full border-2 border-black rounded-sm bg-white font-extrabold text-sm inline-flex items-center justify-center gap-2"
              >
                <FiDownload />
                DOWNLOAD AS TXT
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-black rounded-md w-full max-w-md p-5">
            <div className="flex items-start justify-between">
              <div className="font-extrabold text-sm text-black uppercase flex items-center gap-2">
                {popupOpen === "post" ? <FaRocket /> : <FiCalendar />}
                {popupOpen === "post" ? "POST NOW" : "SCHEDULE POST"}
              </div>

              <button
                onClick={() => setPopupOpen(null)}
                className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
                title="Close"
              >
                <FiX />
              </button>
            </div>

            {popupOpen === "post" ? (
              <>
                <div className="mt-4 text-sm text-black/60">
                  Your post will be published immediately on{" "}
                  <span className="font-extrabold text-black">{platform}</span>.
                </div>

                <button
                  onClick={handlePostNow}
                  disabled={posting}
                  className="mt-5 w-full h-11 border-2 border-black rounded-sm bg-[#00C950] text-black font-extrabold text-sm"
                >
                  {posting ? "POSTING..." : "CONFIRM POST"}
                </button>
              </>
            ) : (
              <>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div>
                    <div className="text-xs font-extrabold text-black/60 uppercase mb-1">Date</div>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full h-11 border-2 border-black rounded-sm px-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-black/60 uppercase mb-1">Time</div>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full h-11 border-2 border-black rounded-sm px-3 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSchedule}
                  disabled={scheduling}
                  className="mt-5 w-full h-11 border-2 border-black rounded-sm bg-[#F0B100] text-black font-extrabold text-sm"
                >
                  {scheduling ? "SCHEDULING..." : "CONFIRM SCHEDULE"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* UI Components (Dashboard/Billing style) */

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-md border-2 border-black p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 bg-[#00B8DB] border-2 border-black rounded-md flex items-center justify-center">
        <div className="text-black">{icon}</div>
      </div>
      <h2 className="font-extrabold text-sm text-black uppercase">{title}</h2>
    </div>
    {children}
  </div>
);

const CardSelect = ({ active, children, className = "", ...props }) => (
  <button
    {...props}
    className={[
      "border-2 border-black rounded-md w-full transition",
      active ? "bg-[#EAFBFF]" : "bg-white hover:bg-black/5",
      className,
    ].join(" ")}
  >
    {children}
  </button>
);

const Chip = ({ children, ...props }) => (
  <button
    {...props}
    className="h-9 px-3 border-2 border-black rounded-sm bg-white font-extrabold text-[11px] text-black hover:bg-black/5"
  >
    {children}
  </button>
);

const CTA = ({ children, ...props }) => (
  <button
    {...props}
    className="h-9 px-3 border-2 border-black rounded-sm bg-[#00B8DB] font-extrabold text-[11px] text-black hover:opacity-90"
  >
    {children}
  </button>
);

const Score = ({ title, value, variant }) => {
  const border =
    variant === "green" ? "border-[#00C950]" : variant === "cyan" ? "border-[#00B8DB]" : "border-black";
  const bg =
    variant === "green" ? "bg-[#F2FFF8]" : variant === "cyan" ? "bg-[#EAFBFF]" : "bg-white";
  return (
    <div className={`border-2 ${border} ${bg} rounded-md p-4`}>
      <div className="text-[10px] font-extrabold text-black/60 uppercase">{title}</div>
      <div className="mt-2 text-2xl font-extrabold text-black">{value}</div>
    </div>
  );
};
