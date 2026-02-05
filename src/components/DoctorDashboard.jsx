

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiCalendar,
  FiClock,
  FiFileText,
  FiSend,
  FiX,
  FiShare2,
  FiClipboard,
  FiCheckCircle,
  FiUser,
  FiPlus,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const COLORS = {
  black: "#0D0D0D",
  cyan: "#00B8DB",
  yellow: "#F0B100",
  page: "#FEFCE8",
  green: "#00C950",
};

/* ---------- helpers ---------- */

const openEmail = ({ to, subject, body }) => {
  const link = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject || ""
  )}&body=${encodeURIComponent(body || "")}`;
  window.location.href = link;
};

/* ---------- UI pieces ---------- */

const StatCard = ({
  title,
  value,
  subtitle,
  border,
  iconBg,
  icon: Icon,
  valuePrefix,
}) => {
  return (
    <div
      className={`border-2 ${border} bg-white rounded-md p-5 flex items-start justify-between`}
    >
      <div>
        <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
          {title}
        </div>
        <div className="mt-2 text-4xl font-extrabold text-black leading-none">
          {valuePrefix ? <span className="mr-1">{valuePrefix}</span> : null}
          {value}
        </div>
        <div className="mt-2 text-sm text-black/60">{subtitle}</div>
      </div>

      <div
        className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${iconBg}`}
      >
        <Icon className="text-black text-xl" />
      </div>
    </div>
  );
};

const SuggestionCard = ({
  icon: Icon,
  title,
  desc,
  confidence,
  cta,
  onPrimary,
  onReject,
}) => {
  return (
    <div className="border-2 border-black bg-white rounded-md">
      <div className="p-4 flex items-start gap-3">
        <div className="h-9 w-9 border-2 border-black rounded-md flex items-center justify-center">
          <Icon className="text-black" />
        </div>

        <div className="flex-1">
          <div className="font-extrabold text-sm text-black">{title}</div>
          <div className="text-xs text-black/60 mt-1">{desc}</div>

          <div className="mt-2 inline-flex items-center gap-2 border border-black/15 rounded px-2 py-1 text-[10px] font-extrabold bg-white">
            <span className="text-black/70">AI CONFIDENCE:</span>
            <span className="text-black">{confidence}%</span>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 p-3 flex gap-3">
        <button
          type="button"
          onClick={onPrimary}
          className="flex-1 h-9 bg-[#00B8DB] text-black font-extrabold text-xs rounded-sm border-2 border-black flex items-center justify-center gap-2"
        >
          <FiSend />
          {cta}
        </button>

        <button
          type="button"
          onClick={onReject}
          className="w-24 h-9 bg-[#0D0D0D] text-white font-extrabold text-xs rounded-sm border-2 border-black flex items-center justify-center gap-2"
        >
          <FiX />
          REJECT
        </button>
      </div>
    </div>
  );
};

const QuickActions = ({ onGo }) => {
  const actions = [
    {
      label: "NEW CONSULTATION",
      icon: FiPlus,
      bg: "bg-[#00B8DB]",
      key: "consultation",
    },
    {
      label: "MANAGE SLOTS",
      icon: FiCalendar,
      bg: "bg-white",
      key: "appointment",
    },
    {
      label: "CREATE POST",
      icon: FiShare2,
      bg: "bg-[#F0B100]",
      key: "socialmedia",
    },
    {
      label: "VIEW REPORTS",
      icon: FiFileText,
      bg: "bg-[#00B8DB]",
      key: "patient",
    },
  ];

  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
      <div className="text-sm font-extrabold text-black uppercase">
        Quick Actions
      </div>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map(({ label, icon: Icon, bg, key }) => (
          <button
            key={label}
            type="button"
            onClick={() => onGo(key)}
            className={`h-10 rounded-sm border-2 border-black ${bg} text-black font-extrabold text-xs flex items-center justify-center gap-2`}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

const TodayAppointments = ({ onViewAll }) => {
  const rows = [
    { name: "Rajesh Kumar", tag: "Follow-up", time: "09:00 AM" },
    { name: "Priya Sharma", tag: "New Patient", time: "10:00 AM" },
    { name: "Amit Patel", tag: "Consultation", time: "02:00 PM" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xs font-extrabold text-black/20 uppercase tracking-widest">
          Today's Appointments
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="h-7 px-3 bg-[#00B8DB] text-black font-extrabold text-[10px] border-2 border-black rounded-sm"
        >
          VIEW ALL
        </button>
      </div>

      <div className="mt-2 border-2 border-black bg-white rounded-md p-3">
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.name}
              className="border-2 border-black rounded-sm p-3 flex items-center gap-3"
            >
              <div className="h-9 w-9 bg-[#00B8DB] border-2 border-black rounded-sm flex items-center justify-center">
                <FiUser className="text-black" />
              </div>

              <div className="flex-1 leading-tight">
                <div className="font-extrabold text-sm text-black">{r.name}</div>
                <div className="text-xs text-black/55">{r.tag}</div>
              </div>

              <div className="h-6 px-2 bg-[#00B8DB] border-2 border-black rounded-sm font-extrabold text-[10px] text-black flex items-center">
                {r.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RecentActivity = () => {
  const items = [
    {
      title: "New Appointment Booked",
      desc: "Rajesh Kumar booked via chatbot for 9:00 AM",
      time: "01:13 PM",
    },
    {
      title: "Payment Received",
      desc: "Priya Sharma paid ₹200 via UPI",
      time: "12:43 PM",
    },
    {
      title: "Report Sent",
      desc: "Medical report sent to Amit Patel via WhatsApp & Email",
      time: "12:28 PM",
    },
    {
      title: "Social Post Published",
      desc: "Health tips post shared on LinkedIn & Instagram",
      time: "11:28 AM",
    },
  ];

  return (
    <div>
      <div className="text-xs font-extrabold text-black/20 uppercase tracking-widest">
        Recent Activity
      </div>

      <div className="mt-2 border-2 border-[#F0B100] bg-white rounded-md p-3 space-y-3">
        {items.map((a) => (
          <div
            key={a.title}
            className="border-2 border-[#00B8DB] rounded-sm p-3 flex items-start gap-3"
          >
            <div className="h-9 w-9 bg-[#0D0D0D] rounded-sm flex items-center justify-center border-2 border-black">
              <FiClipboard className="text-white" />
            </div>

            <div className="flex-1">
              <div className="font-extrabold text-sm text-black">{a.title}</div>
              <div className="text-xs text-black/60 mt-1">{a.desc}</div>
              <div className="text-[10px] text-black/45 mt-1">{a.time}</div>
            </div>

            <FiCheckCircle className="text-[#00C950] text-lg mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
};

const RevenueSummary = () => {
  return (
    <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
      <div className="font-extrabold text-sm text-black uppercase">
        Revenue Summary - February 2026
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border-2 border-[#00C950] rounded-md p-4 bg-[#F2FFF8]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Collected
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">₹18,400</div>
          <div className="text-xs text-black/60 mt-1">92 consultations</div>
        </div>

        <div className="border-2 border-[#F0B100] rounded-md p-4 bg-[#FFFBEE]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Pending
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">₹1,200</div>
          <div className="text-xs text-black/60 mt-1">6 pending</div>
        </div>

        <div className="border-2 border-[#00B8DB] rounded-md p-4 bg-[#EAFBFF]">
          <div className="text-[10px] font-extrabold text-black/60 uppercase">
            Total Expected
          </div>
          <div className="mt-2 text-2xl font-extrabold text-black">₹19,600</div>
          <div className="text-xs text-black/60 mt-1">98 total</div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="h-8 px-4 bg-[#00B8DB] text-black font-extrabold text-xs border-2 border-black rounded-sm"
          onClick={() => alert("View details (demo)")}
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
};

const ClinicWorkflow = () => {
  const steps = [
    {
      n: 1,
      title: "CHATBOT BOOKING",
      desc: "Patients book appointments via AI chatbot → You receive notifications → Set available slots",
      badgeBg: "bg-[#00B8DB]",
      badgeText: "text-black",
    },
    {
      n: 2,
      title: "VOICE CONSULTATION",
      desc: "Record vitals + voice notes → AI transcribes → Preview report → Send via WhatsApp/Email",
      badgeBg: "bg-white",
      badgeText: "text-black",
    },
    {
      n: 3,
      title: "PAYMENT TRACKING",
      desc: "Default ₹200 fee (editable) → Mark as paid when received → Track revenue",
      badgeBg: "bg-[#F0B100]",
      badgeText: "text-black",
    },
    {
      n: 4,
      title: "SOCIAL MEDIA",
      desc: "AI generates health tips posts → Share on LinkedIn, Instagram, Facebook, Twitter",
      badgeBg: "bg-[#00B8DB]",
      badgeText: "text-black",
    },
  ];

  return (
    <div className="border-2 border-black bg-white rounded-md p-4">
      <div className="font-extrabold text-sm text-black uppercase">
        Clinic Workflow
      </div>

      <div className="mt-4 space-y-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="border-2 border-black rounded-sm p-4 flex items-start gap-4"
          >
            <div
              className={`h-8 w-8 rounded-sm border-2 border-black flex items-center justify-center font-extrabold text-sm ${s.badgeBg} ${s.badgeText}`}
            >
              {s.n}
            </div>

            <div className="flex-1">
              <div className="font-extrabold text-sm text-black">{s.title}</div>
              <div className="text-xs text-black/60 mt-1">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Dashboard Page ---------- */

const Dashboard = () => {
  const navigate = useNavigate();

  const go = (routeKey) => {
    const map = {
      consultation: "/consultation",
      appointment: "/appointment",
      socialmedia: "/socialmedia",
      patient: "/patient",
    };
    navigate(map[routeKey] || "/dashboard");
  };

  const sendFollowupEmail = () => {
    openEmail({
      to: "clinic@example.com",
      subject: "Follow-up reminders",
      body:
        "Hi,\n\nPlease send follow-up reminders to the patients due today.\n\nThanks,\nClinic Team",
    });
  };

  const sendPaymentEmail = () => {
    openEmail({
      to: "billing@example.com",
      subject: "Payment reminder",
      body:
        "Hi,\n\nThis is a gentle reminder regarding the pending payment of ₹200.\n\nThanks,\nClinic Team",
    });
  };

  const stats = [
    {
      title: "TODAY'S APPOINTMENTS",
      value: "8",
      subtitle: (
        <span className="inline-flex items-center gap-2">
          <span className="text-[#00C950] font-extrabold">▲</span>
          <span className="text-black/60">+2 from yesterday</span>
        </span>
      ),
      border: "border-[#00B8DB]",
      iconBg: "bg-[#00B8DB]",
      icon: FiCalendar,
    },
    {
      title: "PENDING PAYMENTS",
      value: "1,200",
      valuePrefix: "₹",
      subtitle: "3 payments due",
      border: "border-[#F0B100]",
      iconBg: "bg-[#F0B100]",
      icon: FaRupeeSign,
    },
    {
      title: "REPORTS GENERATED",
      value: "12",
      subtitle: "This week",
      border: "border-black",
      iconBg: "bg-white",
      icon: FiFileText,
    },
    {
      title: "AVAILABLE SLOTS",
      value: "5",
      subtitle: "Open for booking",
      border: "border-[#00B8DB]",
      iconBg: "bg-[#00B8DB]",
      icon: FiClock,
    },
  ];

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: COLORS.page,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      <main className="mx-auto max-w-[1100px] px-6 py-7">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">
              DASHBOARD
            </h1>
            <p className="text-sm text-black/55 mt-1">
              Your clinic command center - AI-powered insights at a glance
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 text-xs font-extrabold text-black/80 hover:text-black mt-1"
            onClick={() => alert("Notifications (demo)")}
          >
            <FiBell />
            NOTIFICATIONS
          </button>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="mt-8">
          <div className="text-xs font-extrabold text-black/20 uppercase tracking-widest">
            AI Suggestions
          </div>

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SuggestionCard
              icon={FiSend}
              title="Send Follow-up Reminder"
              desc="3 patients need follow-up reminders for their next appointments"
              confidence={92}
              cta="SEND EMAIL"
              onPrimary={sendFollowupEmail}
              onReject={() => alert("Rejected (demo)")}
            />
            <SuggestionCard
              icon={FiShare2}
              title="Post Health Tip"
              desc="It's been 3 days since your last social media post. Share a heart health tip?"
              confidence={87}
              cta="GO TO SOCIAL"
              onPrimary={() => go("socialmedia")}
              onReject={() => alert("Rejected (demo)")}
            />
            <SuggestionCard
              icon={FaRupeeSign}
              title="Payment Follow-up"
              desc="Sneha Reddy has an overdue payment of ₹200 from 7 days ago"
              confidence={95}
              cta="SEND EMAIL"
              onPrimary={sendPaymentEmail}
              onReject={() => alert("Rejected (demo)")}
            />
            <SuggestionCard
              icon={FiCalendar}
              title="Schedule Buffer Time"
              desc="You have back-to-back appointments. Consider adding 10-min buffer slots"
              confidence={78}
              cta="MANAGE SLOTS"
              onPrimary={() => go("appointment")}
              onReject={() => alert("Rejected (demo)")}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <QuickActions onGo={go} />
        </div>

        {/* Today + Activity */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TodayAppointments onViewAll={() => go("appointment")} />
          <RecentActivity />
        </div>

        {/* Revenue */}
        <div className="mt-7">
          <RevenueSummary />
        </div>

        {/* Workflow */}
        <div className="mt-7">
          <ClinicWorkflow />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
